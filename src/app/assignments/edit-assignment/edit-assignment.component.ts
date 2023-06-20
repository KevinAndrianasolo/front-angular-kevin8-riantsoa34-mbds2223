import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment, Matiere } from '../assignment.model';
import { MatieresService } from 'src/app/shared/matieres.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

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
  firstFormGroup !: FormGroup;
  secondFormGroup  !: FormGroup;
  thirdFormGroup  !: FormGroup;
  isLinear = false;
  @ViewChild('stepper') stepper!: MatStepper;


  constructor(private assignmentsService: AssignmentsService,
    private matieresService: MatieresService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) { }


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
        this.firstFormGroup = this._formBuilder.group({
          nom: [this.assignmentFormValues.nom, Validators.required],
          dateDeRendu: [this.assignmentFormValues.dateDeRendu, Validators.required],
        });
        this.secondFormGroup = this._formBuilder.group({
          matiere: [this.assignmentFormValues.matiere, Validators.required],
        });
        this.thirdFormGroup = this._formBuilder.group({
          rendu: [this.assignmentFormValues.rendu, Validators.required],
          note: [this.assignmentFormValues.note],
          remarques: [this.assignmentFormValues.remarques],
        });

      });
  }
  onSaveAssignment() {
    this.focusOnFieldWithError(this.thirdFormGroup, 2);
    this.focusOnFieldWithError(this.secondFormGroup, 1);
    this.focusOnFieldWithError(this.firstFormGroup, 0);
    

    Object.assign(this.assignmentFormValues, this.firstFormGroup.getRawValue());
    Object.assign(this.assignmentFormValues, this.secondFormGroup.getRawValue());
    Object.assign(this.assignmentFormValues, this.thirdFormGroup.getRawValue());

    console.log(this.assignmentFormValues);

    // On vérifie que les champs ne sont pas vides
    if (!this.assignmentFormValues.nom || this.assignmentFormValues.nom === "") return;
    if (!this.assignmentFormValues.dateDeRendu) return;
    if (!this.assignmentFormValues.matiere) return;

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

    // Function to focus on the field with an error
    focusOnFieldWithError(form : FormGroup, stepIndex : number) {
    
      const firstErrorField = Object.keys(form.controls).find(field => form.controls[field].invalid);
      if(!firstErrorField) return;
      console.log(firstErrorField);
  
      this.stepper.selectedIndex = stepIndex;
  
      const fieldElement = document.getElementById(firstErrorField);
      if (fieldElement) {
        fieldElement.focus();
      }
    }
  
}
