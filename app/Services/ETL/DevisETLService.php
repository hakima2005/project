<?php

namespace App\Services\ETL;

use App\Models\Devis;
use App\Models\BonCommande;
use App\Models\Fournisseur;
use App\Models\DecretTva;
use App\Models\DecretRas;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class DevisETLService
{
    /**
     * =========================================================
     * IMPORT D'UN DOCUMENT DE DEVIS
     * =========================================================
     *
     * Le fournisseur transmet un PDF.
     *
     * Le module ETL :
     *
     * 1. Stocke le document
     * 2. Extrait le texte du PDF
     * 3. Extrait les informations nécessaires
     * 4. Recherche le Bon de Commande
     * 5. Recherche ou crée le fournisseur
     * 6. Vérifie les doublons
     * 7. Récupère le taux TVA du décret
     * 8. Récupère le taux RAS du décret
     * 9. Calcule TVA
     * 10. Calcule RAS
     * 11. Calcule TTC
     * 12. Crée le devis
     */
    public function import(UploadedFile $file): Devis
    {
        /*
         * =====================================================
         * 1. STOCKAGE DU DOCUMENT
         * =====================================================
         */

        $path = $file->store(
            'devis-fournisseurs',
            'public'
        );

        /*
         * =====================================================
         * 2. EXTRACTION DU TEXTE
         * =====================================================
         */

        $fullPath = Storage::disk('public')->path($path);

        $text = $this->extractText($fullPath);

        if (trim($text) === '') {
            throw new RuntimeException(
                'Impossible d’extraire le texte du document PDF.'
            );
        }

        /*
         * =====================================================
         * 3. PARSING DU DOCUMENT
         * =====================================================
         */

        $data = $this->parseDocument($text);

        /*
         * =====================================================
         * 4. VALIDATION DES INFORMATIONS
         * =====================================================
         *
         * IMPORTANT :
         *
         * Le fournisseur fournit uniquement :
         *
         * - référence devis
         * - date devis
         * - référence BC
         * - fournisseur
         * - HT
         *
         * TVA / RAS / TTC NE SONT PAS lus depuis le PDF.
         * Ils sont calculés automatiquement par le système.
         */

        $required = [
            'reference_devis',
            'date_devis',
            'reference_bc',
            'raison_sociale',
            'montant_ht',
        ];

        foreach ($required as $field) {

            if (
                !array_key_exists($field, $data) ||
                $data[$field] === null ||
                $data[$field] === ''
            ) {
                throw new RuntimeException(
                    "Information introuvable dans le document : {$field}"
                );
            }
        }

        /*
         * =====================================================
         * 5. RECHERCHE DU BON DE COMMANDE
         * =====================================================
         */

        $bc = BonCommande::where(
            'reference_bc',
            $data['reference_bc']
        )->first();

        if (!$bc) {

            throw new RuntimeException(
                "Bon de commande introuvable : "
                . $data['reference_bc']
            );
        }

        /*
         * =====================================================
         * 6. CODE NATURE PRESTATION
         * =====================================================
         */

        $codeNatPrest = $bc->code_nat_prest;

        if (!$codeNatPrest) {

            throw new RuntimeException(
                "Le Bon de Commande {$bc->reference_bc} "
                . "ne possède pas de code nature prestation."
            );
        }

        /*
         * =====================================================
         * 7. RECHERCHE DU FOURNISSEUR
         * =====================================================
         *
         * Ordre de priorité :
         *
         * 1. ICE
         * 2. IF
         * 3. Raison sociale
         */

        $fournisseur = null;

        /*
         * -----------------------------------------------------
         * 7.1 Recherche par ICE
         * -----------------------------------------------------
         */

        if (!empty($data['ICE'])) {

            $fournisseur = Fournisseur::where(
                'ICE',
                $data['ICE']
            )->first();
        }

        /*
         * -----------------------------------------------------
         * 7.2 Recherche par IF
         * -----------------------------------------------------
         */

        if (
            !$fournisseur &&
            !empty($data['identifiant_fiscal'])
        ) {

            $fournisseur = Fournisseur::where(
                'identifiant_fiscal',
                $data['identifiant_fiscal']
            )->first();
        }

        /*
         * -----------------------------------------------------
         * 7.3 Recherche par raison sociale
         * -----------------------------------------------------
         */

        if (!$fournisseur) {

            $fournisseur = Fournisseur::where(
                'raison_sociale',
                $data['raison_sociale']
            )->first();
        }

        /*
         * =====================================================
         * 8. CREATION DU FOURNISSEUR SI NECESSAIRE
         * =====================================================
         */

        if (!$fournisseur) {

            /*
             * Dernière vérification ICE
             */

            if (!empty($data['ICE'])) {

                $fournisseur = Fournisseur::where(
                    'ICE',
                    $data['ICE']
                )->first();
            }

            /*
             * Dernière vérification IF
             */

            if (
                !$fournisseur &&
                !empty($data['identifiant_fiscal'])
            ) {

                $fournisseur = Fournisseur::where(
                    'identifiant_fiscal',
                    $data['identifiant_fiscal']
                )->first();
            }
        }

        /*
         * -----------------------------------------------------
         * Création
         * -----------------------------------------------------
         */

        if (!$fournisseur) {

            try {

                $fournisseur = Fournisseur::create([

                    'raison_sociale' =>
                        $data['raison_sociale'],

                    'identifiant_fiscal' =>
                        $data['identifiant_fiscal'] ?? null,

                    'ICE' =>
                        $data['ICE'] ?? null,

                    'telephone' =>
                        $data['telephone'] ?? null,

                    'email' =>
                        $data['email'] ?? null,

                ]);

            } catch (\Illuminate\Database\QueryException $e) {

                /*
                 * Une autre vérification en cas de
                 * contrainte UNIQUE.
                 */

                if (!empty($data['ICE'])) {

                    $fournisseur = Fournisseur::where(
                        'ICE',
                        $data['ICE']
                    )->first();
                }

                if (
                    !$fournisseur &&
                    !empty($data['identifiant_fiscal'])
                ) {

                    $fournisseur = Fournisseur::where(
                        'identifiant_fiscal',
                        $data['identifiant_fiscal']
                    )->first();
                }

                if (!$fournisseur) {

                    throw new RuntimeException(
                        'Impossible de créer le fournisseur : '
                        . $e->getMessage()
                    );
                }
            }
        }

        /*
         * =====================================================
         * 9. VERIFICATION DES DOUBLONS
         * =====================================================
         */

        $devisExistant = Devis::where(
            'reference_devis',
            $data['reference_devis']
        )
            ->where(
                'id_fournisseur',
                $fournisseur->id_fournisseur
            )
            ->first();

        if ($devisExistant) {

            throw new RuntimeException(
                "Ce devis existe déjà : "
                . $data['reference_devis']
                . " pour le fournisseur "
                . $fournisseur->raison_sociale
                . "."
            );
        }

        /*
         * =====================================================
         * 10. RECUPERATION DU TAUX TVA
         * =====================================================
         *
         * On cherche le dernier décret TVA applicable
         * à la date du devis.
         */

        $tauxTva = DecretTva::where(
            'code_nat_prest',
            $codeNatPrest
        )
            ->where(
                'date',
                '<=',
                $data['date_devis']
            )
            ->orderByDesc('date')
            ->value('taux');

        /*
         * Aucun décret = TVA 0
         */

        $tauxTva = $tauxTva !== null
            ? (float) $tauxTva
            : 0;

        /*
         * =====================================================
         * 11. RECUPERATION DU TAUX RAS
         * =====================================================
         *
         * On cherche le dernier décret RAS applicable
         * à la date du devis.
         */

        $tauxRas = DecretRas::where(
            'code_nat_prest',
            $codeNatPrest
        )
            ->where(
                'date',
                '<=',
                $data['date_devis']
            )
            ->orderByDesc('date')
            ->value('taux');

        /*
         * Aucun décret = RAS 0
         */

        $tauxRas = $tauxRas !== null
            ? (float) $tauxRas
            : 0;

        /*
         * =====================================================
         * 12. CALCUL DES MONTANTS
         * =====================================================
         */

        $montantHt = (float) $data['montant_ht'];

        /*
         * TVA = HT × taux TVA / 100
         */

        $montantTva = round(
            $montantHt * $tauxTva / 100,
            2
        );

        /*
         * RAS = HT × taux RAS / 100
         */

        $montantRetenue = round(
            $montantHt * $tauxRas / 100,
            2
        );

        /*
         * TTC = HT + TVA
         *
         * La retenue RAS reste séparée.
         */

        $montantTtc = round(
            $montantHt + $montantTva,
            2
        );

        /*
         * =====================================================
         * 13. CREATION DU DEVIS
         * =====================================================
         */

        return Devis::create([

            'reference_devis' =>
                $data['reference_devis'],

            'date_devis' =>
                $data['date_devis'],

            'montant_ht' =>
                $montantHt,

            'montant_tva' =>
                $montantTva,

            'montant_retenue' =>
                $montantRetenue,

            'montant_ttc' =>
                $montantTtc,

            'piece_jointe' =>
                $path,

            /*
             * Nouveau devis = Reçu
             */

            'id_statut' =>
                1,

            'observation' =>
                $data['observation'] ?? null,

            'reference_bc' =>
                $bc->reference_bc,

            'id_fournisseur' =>
                $fournisseur->id_fournisseur,

        ]);
    }


    /**
     * =========================================================
     * EXTRACTION TEXTE PDF
     * =========================================================
     */

    private function extractText(
        string $filePath
    ): string {

        $command =
            'pdftotext -layout '
            . escapeshellarg($filePath)
            . ' -';

        $output = shell_exec($command);

        return $output ?? '';
    }


    /**
     * =========================================================
     * PARSING DU DOCUMENT
     * =========================================================
     *
     * Le parser accepte les formats :
     *
     * Référence devis : DEV-2026-004
     * Référence devis DEV-2026-004
     *
     * Même chose pour les autres champs.
     */

    private function parseDocument(
        string $text
    ): array {

        $data = [];

        /*
         * -----------------------------------------------------
         * Référence devis
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/Référence\s+devis\s*:?\s*([A-Z0-9\-]+)/iu',
                $text,
                $matches
            )
        ) {

            $data['reference_devis'] =
                trim($matches[1]);
        }

        /*
         * -----------------------------------------------------
         * Date devis
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/Date\s*:?\s*(\d{2}\/\d{2}\/\d{4})/iu',
                $text,
                $matches
            )
        ) {

            $date = \DateTime::createFromFormat(
                'd/m/Y',
                $matches[1]
            );

            if ($date) {

                $data['date_devis'] =
                    $date->format('Y-m-d');
            }
        }

        /*
         * -----------------------------------------------------
         * Référence BC
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/Référence\s+BC\s*:?\s*([A-Z0-9\-]+)/iu',
                $text,
                $matches
            )
        ) {

            $data['reference_bc'] =
                trim($matches[1]);
        }

        /*
         * -----------------------------------------------------
         * Fournisseur
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/Raison\s+sociale\s*:?\s*(.+?)(?=\R|$)/iu',
                $text,
                $matches
            )
        ) {

            $data['raison_sociale'] =
                trim($matches[1]);
        }

        /*
         * -----------------------------------------------------
         * Identifiant fiscal
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/\bIF\s*:?\s*([A-Z0-9]+)/iu',
                $text,
                $matches
            )
        ) {

            $data['identifiant_fiscal'] =
                trim($matches[1]);
        }

        /*
         * -----------------------------------------------------
         * ICE
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/\bICE\s*:?\s*([0-9]+)/iu',
                $text,
                $matches
            )
        ) {

            $data['ICE'] =
                trim($matches[1]);
        }

        /*
         * -----------------------------------------------------
         * Téléphone
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/Téléphone\s*:?\s*([0-9\s\+\-]+)/iu',
                $text,
                $matches
            )
        ) {

            $data['telephone'] =
                trim($matches[1]);
        }

        /*
         * -----------------------------------------------------
         * Email
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/Email\s*:?\s*([^\s]+)/iu',
                $text,
                $matches
            )
        ) {

            $data['email'] =
                trim($matches[1]);
        }

        /*
         * -----------------------------------------------------
         * Montant HT
         * -----------------------------------------------------
         *
         * IMPORTANT :
         * C'est le seul montant récupéré depuis le PDF.
         */

        if (
            preg_match(
                '/Montant\s+HT\s*:?\s*([\d\s.,]+)\s*MAD/iu',
                $text,
                $matches
            )
        ) {

            $data['montant_ht'] =
                $this->parseAmount($matches[1]);
        }

        /*
         * -----------------------------------------------------
         * Observation
         * -----------------------------------------------------
         */

        $data['observation'] =
            'Importé automatiquement par le module ETL.';

        return $data;
    }


    /**
     * =========================================================
     * CONVERSION DES MONTANTS
     * =========================================================
     */

    private function parseAmount(
        string $amount
    ): float {

        $amount = trim($amount);

        /*
         * Suppression des espaces normaux.
         */

        $amount = str_replace(
            ' ',
            '',
            $amount
        );

        /*
         * Suppression des espaces insécables
         * éventuellement présents dans un PDF.
         */

        $amount = str_replace(
            "\xc2\xa0",
            '',
            $amount
        );

        /*
         * Gestion des formats :
         *
         * 10000
         * 10000.50
         * 10000,50
         * 10.000,50
         * 10,000.50
         */

        if (
            str_contains($amount, ',') &&
            str_contains($amount, '.')
        ) {

            /*
             * Si la virgule apparaît après le point,
             * on considère :
             *
             * 10.000,50
             *
             * comme format européen.
             */

            if (
                strrpos($amount, ',') >
                strrpos($amount, '.')
            ) {

                $amount = str_replace(
                    '.',
                    '',
                    $amount
                );

                $amount = str_replace(
                    ',',
                    '.',
                    $amount
                );

            } else {

                /*
                 * Format :
                 *
                 * 10,000.50
                 */

                $amount = str_replace(
                    ',',
                    '',
                    $amount
                );
            }

        } else {

            /*
             * Format :
             *
             * 10000,50
             */

            $amount = str_replace(
                ',',
                '.',
                $amount
            );
        }

        return (float) $amount;
    }
}
