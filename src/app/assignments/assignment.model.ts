export class Auteur {
    _id?: string;
    nom!: string;
    photo!: string;
}
export class Prof {
    _id?: string;
    nom!: string;
    photo!: string;
}
export class Matiere {
    _id?: string;
    id!: number;
    nom!: string;
    photo!: string;
    prof!: Prof;

}
export class Assignment {
    _id?: string;
    id!: number;
    nom!: string;
    dateDeRendu!: Date;
    rendu!: boolean;
    auteur!: Auteur;
    matiere!: Matiere;
    note?: number | null;
    remarques?: string | null;
}

