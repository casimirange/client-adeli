/**
 * Created by Casimir on 01/04/2021.
 */
export class Prêts {
    id_pret?: number;
    date_pret?: Date;
    date_remboursement?: Date;
    montant_prete?: number;
    taux?: number;
    montant_rembourse?: number;
    rembourse?: boolean;
    nom?: string;
    constructor( ) {}
}