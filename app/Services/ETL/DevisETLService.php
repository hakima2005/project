<?php

namespace App\Services\ETL;

use App\Models\Devis;
use App\Models\BonCommande;
use App\Models\Fournisseur;
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
     * 1. Stocker le document
     * 2. Extraire le texte
     * 3. Parser les informations
     * 4. Chercher le BC
     * 5. Chercher ou créer le fournisseur
     * 6. Vérifier les doublons
     * 7. Créer le devis
     */
    public function import(UploadedFile $file): Devis
    {
        /*
         * =====================================================
         * 1. STOCKAGE
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

        $fullPath =
            Storage::disk('public')->path($path);

        $text =
            $this->extractText($fullPath);

        if (trim($text) === '') {

            throw new RuntimeException(
                'Impossible d’extraire le texte du document.'
            );
        }

        /*
         * =====================================================
         * 3. PARSING
         * =====================================================
         */

        $data =
            $this->parseDocument($text);

        /*
         * =====================================================
         * 4. VALIDATION MINIMALE
         * =====================================================
         */

        $required = [
            'reference_devis',
            'date_devis',
            'reference_bc',
            'raison_sociale',
            'montant_ht',
            'montant_tva',
            'montant_retenue',
            'montant_ttc',
        ];

        foreach ($required as $field) {

            if (
                !isset($data[$field]) ||
                $data[$field] === ''
            ) {

                throw new RuntimeException(
                    "Information introuvable dans le document : {$field}"
                );
            }
        }

        /*
         * =====================================================
         * 5. RECHERCHE DU BC
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
         * 6. RECHERCHE DU FOURNISSEUR
         * =====================================================
         */

        /*
         * Recherche d'abord par raison sociale.
         */
        $fournisseur = Fournisseur::where(
            'raison_sociale',
            $data['raison_sociale']
        )->first();

        /*
         * Recherche par IF + raison sociale.
         */
        if (
            !$fournisseur &&
            !empty($data['identifiant_fiscal'])
        ) {

            $fournisseur =
                Fournisseur::where(
                    'identifiant_fiscal',
                    $data['identifiant_fiscal']
                )
                ->where(
                    'raison_sociale',
                    $data['raison_sociale']
                )
                ->first();
        }

        /*
         * Recherche par ICE + raison sociale.
         */
        if (
            !$fournisseur &&
            !empty($data['ICE'])
        ) {

            $fournisseur =
                Fournisseur::where(
                    'ICE',
                    $data['ICE']
                )
                ->where(
                    'raison_sociale',
                    $data['raison_sociale']
                )
                ->first();
        }

        /*
         * =====================================================
         * CREATION AUTOMATIQUE DU FOURNISSEUR
         * =====================================================
         */

        if (!$fournisseur) {

            $fournisseur =
                Fournisseur::create([

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
        }

        /*
         * =====================================================
         * 7. VERIFICATION DES DOUBLONS
         * =====================================================
         *
         * Un même fournisseur ne peut pas avoir deux devis
         * avec la même référence.
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
         * 8. CREATION DU DEVIS
         * =====================================================
         */

        return Devis::create([

            'reference_devis' =>
                $data['reference_devis'],

            'date_devis' =>
                $data['date_devis'],

            'montant_ht' =>
                $data['montant_ht'],

            'montant_tva' =>
                $data['montant_tva'],

            'montant_retenue' =>
                $data['montant_retenue'],

            'montant_ttc' =>
                $data['montant_ttc'],

            'piece_jointe' =>
                $path,

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

        $output =
            shell_exec($command);

        return $output ?? '';
    }


    /**
     * =========================================================
     * PARSING DU DOCUMENT
     * =========================================================
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
                '/Référence\s+devis\s+([A-Z0-9\-]+)/iu',
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
                '/Date\s+(\d{2}\/\d{2}\/\d{4})/iu',
                $text,
                $matches
            )
        ) {

            $date =
                \DateTime::createFromFormat(
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
                '/Référence\s+BC\s+([A-Z0-9\-]+)/iu',
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
                '/Raison\s+sociale\s+(.+)/iu',
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
                '/\bIF\s+([A-Z0-9]+)/iu',
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
                '/\bICE\s+([0-9]+)/iu',
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
                '/Téléphone\s+([0-9\s]+)/iu',
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
                '/Email\s+([^\s]+)/iu',
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
         */

        if (
            preg_match(
                '/Montant\s+HT\s+([\d\s.,]+)\s*MAD/iu',
                $text,
                $matches
            )
        ) {

            $data['montant_ht'] =
                $this->parseAmount($matches[1]);
        }


        /*
         * -----------------------------------------------------
         * TVA
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/TVA\s+[\d.,]+\s*%\s*[—\-]\s*([\d\s.,]+)\s*MAD/iu',
                $text,
                $matches
            )
        ) {

            $data['montant_tva'] =
                $this->parseAmount($matches[1]);
        }


        /*
         * -----------------------------------------------------
         * RAS
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/Retenue\s+à\s+la\s+source\s+\(RAS\)\s+[\d.,]+\s*%\s*[—\-]\s*([\d\s.,]+)\s*MAD/iu',
                $text,
                $matches
            )
        ) {

            $data['montant_retenue'] =
                $this->parseAmount($matches[1]);
        }


        /*
         * -----------------------------------------------------
         * TTC
         * -----------------------------------------------------
         */

        if (
            preg_match(
                '/Montant\s+TTC\s+([\d\s.,]+)\s*MAD/iu',
                $text,
                $matches
            )
        ) {

            $data['montant_ttc'] =
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

        $amount =
            trim($amount);

        $amount =
            str_replace(
                ' ',
                '',
                $amount
            );

        $amount =
            str_replace(
                ',',
                '.',
                $amount
            );

        return (float) $amount;
    }
}