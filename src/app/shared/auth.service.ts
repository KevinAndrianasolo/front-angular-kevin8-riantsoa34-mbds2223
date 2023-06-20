import { Injectable } from '@angular/core';
import { Auteur } from '../assignments/assignment.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor( private http:HttpClient) { }
  private uri_api = environment.apiURI+'/api/auth';
  // théoriquement, on devrait passer en paramètre le login
  // et le password, cette méthode devrait faire une requête
  // vers un Web Service pour vérifier que c'est ok, renvoyer
  // un token d'authentification JWT etc.
  // elle devrait renvoyer un Observable etc.
  logIn(user:any):Observable<any>  {
    return this.http.post<any>(this.uri_api + '/login', user); 
  }
  //requete qui renvoie l ' user connecté selon token
  getUserLogged():Observable<any>  {
   let token :any='';
     token = localStorage.getItem("token");
    
    return this.http.get<Auteur>(this.uri_api + '/me'); 
  }
  //renvoi  l'user qui est dans le storage
  getStockedUser (){
    let user:any  ;
    user = localStorage.getItem("user")
    return JSON.parse(user);
  }
  isLogin() {
    if (localStorage.getItem("token") == null) {
      return false;
    }
    return true;
  }
  logOut() {
    console.log("ON SE DELOGGE")
    localStorage.removeItem("token");
  
  }

  // si on l'utilisait on ferai isAdmin().then(...)
  isAdmin() {
    // Pour le moment, version simplifiée...
    // on suppose qu'on est admin si on est loggué
    const isUserAdminPromise = new Promise((resolve, reject) => {
      if(this.getStockedUser().role==1){
        resolve(true);
      }
      else{
        resolve(false)
      }
       
    });

    // on renvoie la promesse qui dit si on est admin ou pas
    return isUserAdminPromise;
  }
}
