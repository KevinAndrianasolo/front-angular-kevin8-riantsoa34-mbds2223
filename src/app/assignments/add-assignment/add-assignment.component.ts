import { Component } from '@angular/core';
import { Assignment, Matiere } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { MatieresService } from 'src/app/shared/matieres.service';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  // champs du formulaire
  // associées aux champs du formulaire
  assignmentFormValues !: Assignment;

  matieres: Matiere[] = [];


  constructor(private assignmentsService: AssignmentsService,
    private matieresService: MatieresService,
    private router: Router, 
    private _snackBar: MatSnackBar,
    private authService :AuthService) { }

  ngOnInit(): void {
    this.assignmentFormValues = new Assignment();
    this.getMatieres();
  }

  getMatieres() {
    console.log("On va chercher les matieres dans le service");

    this.matieresService.getMatieres()
      .subscribe(data => {
        this.matieres = data;
        console.log("Données reçues", data);
      });
  }
  onSubmit(event: any) {
    // On vérifie que les champs ne sont pas vides
    if (!this.assignmentFormValues.nom || this.assignmentFormValues.nom === "") return;
    if (!this.assignmentFormValues.dateDeRendu) return;
    if (!this.assignmentFormValues.matiere) return;

    this.assignmentFormValues.rendu = false;

    // ici on doit mettre l'utilisateur connécté
    
    this.assignmentFormValues.auteur = {"nom":this.authService.getStockedUser().nom,"photo":this.authService.getStockedUser().photo};

    // on demande au service d'ajouter l'assignment
    this.assignmentsService.addAssignment(this.assignmentFormValues)
      .subscribe(message => {
        console.log(message);
        this._snackBar.open("Assignement ajouté avec succès", "Fermer");

        // On va naviguer vers la page d'accueil pour afficher la liste
        // des assignments
        this.router.navigate(["/assignments"]);

      });
  }
  onSelectionChange(event: MatSelectChange): void {
    // Access the selected object using event.value
    console.log('Selected matiere:', event.value);
    // Perform any additional actions or logic here
  }
}
