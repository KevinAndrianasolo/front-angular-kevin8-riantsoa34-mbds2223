import { Injectable } from '@angular/core';
import { Assignment, Auteur, Matiere, Prof } from '../assignments/assignment.model';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments, bdInitialMatieres } from './data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {
// tableau de devoirs à rendre
matieres:Matiere[] = []
  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  private uri_api = environment.apiURI+'/api/matieres';

  getMatieres():Observable<any> {
    // normalement on doit envoyer une requête HTTP
    // sur un web service, et ça peut prendre du temps
    // On a donc besoin "d'attendre que les données arrivent".
    // Angular utilise pour cela la notion d'Observable
    console.log(this.uri_api);
    return this.http.get<Matiere[]>(this.uri_api);
    
    // of() permet de créer un Observable qui va
    // contenir les données du tableau assignments
    //return of(this.assignments);
  }


  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 
  addMatiere(matiere:Matiere):Observable<any> {
    this.loggingService.log(matiere.nom, 'ajouté');

    // plus tard on utilisera un web service pour l'ajout dans une vraie BD
    return this.http.post<Matiere>(this.uri_api, matiere);
    // on ajoute le devoir au tableau des devoirs
    //this.assignments.push(assignment);
    // on retourne un message de succès à travers
    // un Observable
    //return of(`Assignment ${assignment.nom} ajouté avec succès`);
  }

  peuplerBD() {
    bdInitialMatieres.forEach(a => {
      // Matiere & Prof
      const prof = new Prof();
      prof.nom = a.prof.nom;
      prof.photo = a.prof.photo;

      const matiere = new Matiere();
      matiere.nom = a.nom;
      matiere.photo = a.photo;
      matiere.prof = prof;
      // Attributs Additionnels : Note et Remarques

      this.addMatiere(matiere)
      .subscribe((reponse) => {
        console.log(reponse.message);
      })
    })
  }

  // cette version retourne un Observable. Elle permet de savoir quand
  // l'opération est terminée (l'ajout des 1000 assignments)
  peuplerBDavecForkJoin():Observable<any> {
    // tableau d'observables (les valeurs de retour de addAssignment)
    let appelsVersAddAssignment:Observable<any>[] = [];
 
    bdInitialMatieres.forEach(a => {
      // Matiere & Prof
      const prof = new Prof();
      prof.nom = a.prof.nom;
      prof.photo = a.prof.photo;

      const matiere = new Matiere();
      matiere.nom = a.nom;
      matiere.photo = a.photo;
      matiere.prof = prof;
 
      appelsVersAddAssignment.push(this.addMatiere(matiere))
    });
 
    return forkJoin(appelsVersAddAssignment);
  }
 
}
