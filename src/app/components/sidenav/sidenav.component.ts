import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { MatieresService } from 'src/app/shared/matieres.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  title = 'Application de gestion de devoirs à rendre';
  labelConnexion = "Se connecter";
  nom:string = "";
  photo:string = "";
  currentRoute:string = "";

  constructor(private authService:AuthService, 
              private router:Router,
              private assigmmentsService:AssignmentsService, 
              private matiereService:MatieresService) {
    console.log(router.url);

    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        console.log(event.url);
        this.currentRoute = event.url;
      }
    });
    
    
  }

  login() {
    // utilise l'authService pour se connecter
    if(this.authService.isLogin()==false) {
      this.router.navigate(['/login'])
      // on change le label du bouton
     
    } else {
      this.authService.logOut();
      // et on navigue vers la page d'accueil
      this.router.navigate(["/login"]);
    }
  }

  isLogged() {
    if(this.authService.isLogin()==true) {
      this.labelConnexion = "Se déconnecter";
  
      this.nom =this.authService.getStockedUser().nom  
      this.photo = this.authService.getStockedUser().photo
    }
    else{
      this.labelConnexion = "Se connecter";
    }
    return this.authService.isLogin()
  }

  creerDonneesDeTest() {
    this.matiereService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Opération terminée, matières insérées")
    });

    this.assigmmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Opération terminée, les 1000 données ont été insérées")

      // on refresh la page pour que la liste apparaisse
      // plusieurs manières de faire....
      window.location.reload();
    });
  }
}
