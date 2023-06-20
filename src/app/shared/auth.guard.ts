import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
export const authGuard: CanActivateFn = (route, state) => {

  // injection par programme (au lieu de le faire dans 
  // le constructeur d'un composant)
  let authService = inject(AuthService);
  let router = inject(Router);
  let snackBar = inject(MatSnackBar);
  // si ça renvoie true, alors, on peut activer la route
  if(authService.isLogin()==false){
    snackBar.open("Vous devez se connecter  ", 'Fermer', {
      duration: 3000, // Durée d'affichage du snackbar en millisecondes
    });
    // et on retourne vers la page d'accueil
    router.navigate(["/login"]);
    return false;
  
  }
  return true;
};
export const adminGuard: CanActivateFn = (route, state) => {

  // injection par programme (au lieu de le faire dans 
  // le constructeur d'un composant)
  let authService = inject(AuthService);
  let router = inject(Router);
  let snackBar = inject(MatSnackBar);
  // si ça renvoie true, alors, on peut activer la route
  return authService.isAdmin()
  .then(authentifie => {
    if(authentifie) {
      console.log("Vous êtes admin, navigation autorisée !");
      return true;
    } else {
      console.log("Vous n'êtes pas admin ! Navigation refusée !");
      snackBar.open("Vous devez se connecter en tant que admin pour pouvoir faire cette action ", 'Fermer', {
        duration: 3000, // Durée d'affichage du snackbar en millisecondes
      });
      return false;
    }
  })
};
