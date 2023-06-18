import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment, Matiere } from '../assignment.model';
import { MatieresService } from 'src/app/shared/matieres.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;

  // associées aux champs du formulaire
  assignmentFormValues !: Assignment;

  matieres: Matiere[] = [];


  constructor(private assignmentsService: AssignmentsService,
    private matieresService: MatieresService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }


  getMatieres() {
    console.log("On va chercher les matieres dans le service");

    this.matieresService.getMatieres()
      .subscribe(data => {
        this.matieres = data;
        console.log("Matières reçues", data);
      });
  }

  ngOnInit(): void {
    this.getAssignment();
    this.getMatieres();
  }
  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id)
      .subscribe((assignment) => {
        if (!assignment) return;
        this.assignment = assignment;
        console.log("assignment to edit" , this.assignment);
        // Pour pré-remplir le formulaire
        this.assignmentFormValues = Object.assign({}, this.assignment);
      });
  }
  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.assignmentFormValues.rendu && !this.assignmentFormValues.note) return;

    // on récupère les valeurs dans le formulaire
    this.assignmentsService
      .updateAssignment(this.assignmentFormValues)
      .subscribe((message) => {
        console.log(message);
        this._snackBar.open("Assignement modifié avec succès", "Fermer");


        // navigation vers la home page
        this.router.navigate(['/assignments']);
      });
  }

  onAssignmentRendu() {
    if (!this.assignment) return;
    if(!this.assignmentFormValues.rendu) {
      // Si on update le rendu à false , on supprime la note et le remarques associées
      this.assignmentFormValues.note = null;
      this.assignmentFormValues.remarques = null;
    }

    console.log(this.assignmentFormValues);
  }

  compareMatiereOptions(option1: Matiere, option2: Matiere): boolean {
    return option1 && option2 ? option1._id === option2._id : option1 === option2;
  }
}
