import { Component, ViewChild } from '@angular/core';
import { Assignment, Matiere } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { MatieresService } from 'src/app/shared/matieres.service';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
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
  firstFormGroup = this._formBuilder.group({
    nom: [null, Validators.required],
    dateDeRendu: [null, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    matiere: [null, Validators.required],
  });
  isLinear = false;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private assignmentsService: AssignmentsService,
    private matieresService: MatieresService,
    private router: Router, 
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private authService : AuthService) { }

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
  onSubmit() {
    this.focusOnFieldWithError(this.secondFormGroup, 1);
    this.focusOnFieldWithError(this.firstFormGroup, 0);
    

    Object.assign(this.assignmentFormValues, this.firstFormGroup.getRawValue());
    Object.assign(this.assignmentFormValues, this.secondFormGroup.getRawValue());
    console.log(this.assignmentFormValues);

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

  // Function to focus on the field with an error
  focusOnFieldWithError(form : FormGroup, stepIndex : number) {
    const firstErrorField = Object.keys(form.controls).find(field => form.controls[field].invalid);
    if(!firstErrorField) return;
    this.stepper.selectedIndex = stepIndex;
    const fieldElement = document.getElementById(firstErrorField);
    if (fieldElement) {
      fieldElement.focus();
    }
  }

  onSelectionChange(event: MatSelectChange): void {
    // Access the selected object using event.value
    console.log('Selected matiere:', event.value);
    // Perform any additional actions or logic here
  }
}
