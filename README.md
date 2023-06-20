# AssignmentApp

## Membres du groupe 6 :
- N°08, ANDRIANASOLO LALA Sitrakaharinetsa Kevin
- N°34, RAMANAMPAMONJY Sandratriniaina Riantsoa

## Repositories :
- API : https://github.com/KevinAndrianasolo/api-angular-kevin8-riantsoa34-mbds2223.git
- FRONT : https://github.com/KevinAndrianasolo/front-angular-kevin8-riantsoa34-mbds2223.git

## RENDER.COM
- API : https://api-angular-kevin8-riantsoa34-mbds2223.onrender.com
- FRONT : https://front-angular-kevin8-riantsoa34-mbds2223.onrender.com
## Lien du cours :
> http://miageprojet2.unice.fr/Intranet_de_Michel_Buffa/M2_MBDS_Madagascar_2022-2023_Introduction_%c3%a0_Angular

## Lancement de l'application [DEV]
```shell
# DEV
ng serve
```

## Configurations des variables d'environements
Création de deux fichiers `src/environments/environment.ts` pour le dévelopement et `src/environments/environment.prod.ts` pour la production, qui contient tous les deux l'URL de l'API soit en local soit hébergé sur `render.com`

Ajout de ces lignes dans le fichier `angular.json`
```json
// Dans angular.json
...
"projects": {
    "architect": {
        "build": {
            "configurations": {
                "production": {
                    "fileReplacements": [
                        {
                            "replace": "src/environments/environment.ts",
                            "with": "src/environments/environment.prod.ts"
                        }
                    ]
                    ...,
                }
                ...,
            }
            ...,
        }
        ...,
    }
    ...,
}
```

Changement du script de build dans `package.json`
```json
// package.json
"scripts": {
    "build": "npm install; ng build --configuration=production",
    ...,
}
```

## Ajout des nouvelles attributs :
- Générer 1000 données de tests d'assignments et 5 données de tests de matières sur `mockaroo.com`, tous les deux contenus dans le fichier `data.ts` 
```ts
export const bdInitialMatieres = ...
export const bdInitialAssignments = 
```
- Insérer dans la base de donées mongo, via le clic du bouton `Peupler BD` déjà mis en place lors du cours (Que j'ai commenté pour la version finale)
- Types :
```ts
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
```
- Ajout du service : `shared/matieres.service.ts` pour pouvoir avoir des 5 matières à afficher dans les selects lors des Ajout et Editions d'assignments. Ce service contient aussi la méthode pour insérer les données de tests

## Mise en place d'un Stepper pour l'ajout et l'édition d'assignements
- Pour l'édition, la matière est pré-sélectionné si elle est présente dans la liste des 5 matières
```ts
// On compare les matières par l'objectId provenant de mongoDB, à mettre <mat-select [compareWith]="compareMatiereOptions"... au niveau du champ
compareMatiereOptions(option1: Matiere, option2: Matiere): boolean {
    return option1 && option2 ? option1._id === option2._id : option1 === option2;
  }
```
- Il faut remarquer que si un champ est invalide, lors du clic sur le bouton `Sauvegarder`, on mets le focus sur le champ concerné dans l'indice du stepper qui contient ce champ
```ts
// Fonction qui mets le focus sur le premier champ invalide d'un bloc du stepper
focusOnFieldWithError(form : FormGroup, stepIndex : number) {
    const firstErrorField = Object.keys(form.controls).find(field => form.controls[field].invalid);
    if(!firstErrorField) return;
    this.stepper.selectedIndex = stepIndex;
    const fieldElement = document.getElementById(firstErrorField);
    if (fieldElement) {
        fieldElement.focus();
    }
}
```
## Implémentation du drag and drop pour rendre les devoirs
- Dans l'affichage de la liste des assignments : Il y a deux onglets `Rendu` et `Non Rendu`. (La liste paginée, avec une limite définie, est trié par l'attribu rendu si `false`ou `true`)
- Dans le cas où on veut rendre un devoir, on fait un drag d'un Assignement de l'onglet non rendu vers l'onglet rendu. Cette action fait apparaitre un `Modal` présentant deux champs : `Note` et `Remarques`. Si on clique sur Enregister cela marque automatiquement l'assignment comme RENDU
- Dans le cas contraire, si on pour n'importe quelle raison annuler la rendu d'un assignment, on drag un assignment de l'onglet Rendu et on le drop dans l'onglet Non-rendu. Cette action marque automatiquement l'assignment comme non rendu, et supprime les champs note et remarques.

## Rendre beau l'affichage:
- Présentation des assignements sous forme de Card
- Affichage d'un `Snackbar` loars du succès de l'ajout, de la modification et de la suppression d'un assignment. 
- Mise en place d'un sidenav qui contient trois liens : `Accueil`, `Assignments`, et le troisieme un bouton `Se connecter`(Si l'utilisateur n'est pas connecté et devient Se déconnecter si un utilisateur est connecté)