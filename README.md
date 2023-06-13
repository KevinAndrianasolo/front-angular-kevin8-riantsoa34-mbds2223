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

# Lancement de l'application [DEV]
```shell
# DEV
ng serve
```

# Configurations des variables d'environements
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
