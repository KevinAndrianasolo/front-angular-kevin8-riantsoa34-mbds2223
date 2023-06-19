import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Assignment } from 'src/app/assignments/assignment.model';

@Component({
  selector: 'app-assignment-dialog-edit',
  templateUrl: './assignment-dialog-edit.component.html',
  styleUrls: ['./assignment-dialog-edit.component.css']
})
export class AssignmentDialogEditComponent {
  constructor(
    public dialogRef: MatDialogRef<AssignmentDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public assignment: Assignment,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    // Si l assignement n'est pas rendu (mais on va le rendre), et que la note est null ne rien faire
    if(!this.assignment.rendu && !this.assignment.note) return;
    this.assignment.rendu = true;
    this.dialogRef.close(this.assignment);
  }

  
}
