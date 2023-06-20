import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Auteur } from '../assignments/assignment.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string ='';
  password: string='';
  error: any='';
  constructor(private loginServ:AuthService,private router:Router) {}

  login() {
    let auteur:Auteur = {
      email : this.username,
      password : this.password
    }
  
    this.loginServ.logIn(auteur).subscribe(
      (d:any)=>{
        this.error = d.token;
        localStorage.setItem('token', d.token); 
        this.loginServ.loggedIn=true;
         this.loginServ.getUserLogged().subscribe(
        (d:any)=>{
          // this.nom =d.nom;
          localStorage.setItem('user',  JSON.stringify(d)); 
          this.router.navigate(['/assignments']);
        },
        (err:any) => {
         
            // Autre gestion d'erreur
            this.error = err.error.message;
          
          
        }
      );
         this.router.navigate(['/assignments']);
      },
      (err:any) => {
        if (err.status === 404) {
          this.error = err.error; // Récupération du message d'erreur "No user found"
        } else {
          // Autre gestion d'erreur
          this.error = "Mot de passe erroné";
        }
        
      }
    );
  }

}
