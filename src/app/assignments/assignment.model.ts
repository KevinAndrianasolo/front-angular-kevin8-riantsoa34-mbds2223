export class Auteur {
    nom!: string;
    photo!: string;
}
export class Prof {
    nom!: string;
    photo!: string;
}
export class Matiere {
    nom!: string;
    photo!: string;
    prof!: Prof;

}
export class Assignment {
    _id!: string;
    id!: number;
    nom!: string;
    dateDeRendu!: Date;
    rendu!: boolean;
    auteur!: Auteur;
    matiere!: Matiere;
    note!: number;
    remarques?: string;
}

