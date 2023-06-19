import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import {NgFor} from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Assignment } from 'src/app/assignments/assignment.model';
import { AssignmentDialogEditComponent } from '../assignment-dialog-edit/assignment-dialog-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignments-drag-and-drop',
  templateUrl: './assignments-drag-and-drop.component.html',
  styleUrls: ['./assignments-drag-and-drop.component.css'],
})
export class AssignmentsDragAndDropComponent implements OnChanges{
  @Input() assignments !: Assignment[];

  assignmentsRendu : Assignment[] = [];

  assignmentsNonRendu : Assignment[] = [];

  constructor(public dialog: MatDialog, private assignmentsService: AssignmentsService, private _snackBar: MatSnackBar) {}
  ngOnChanges(): void {
    this.dispatchAssignments();
  }

  dispatchAssignments(){
    // Reset value after data passed to the component changes
    this.assignmentsRendu = [];
    this.assignmentsNonRendu = [];
    this.assignments.forEach(a => {
      if(a.rendu) this.assignmentsRendu.push(a);
      else this.assignmentsNonRendu.push(a);
    });
  }

  drop(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event.previousContainer.id === "cdk-drop-list-0") {
        // Si on transfère un assignment non rendu vers RENDU
        const assignment = this.assignmentsNonRendu[event.previousIndex];;
        const dialogRef = this.dialog.open(AssignmentDialogEditComponent, {
          data: assignment,
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if(!result) return;
          this.assignmentsService.updateAssignment(result)
          .subscribe(() => {
            this._snackBar.open("Assignement rendu avec succès", "Fermer");
            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex,
            );
          });
          
        });
      }
      else{
        // Si on transfère un assignment rendu vers NON RENDU
        let assignment = this.assignmentsRendu[event.previousIndex];

        // On supprime les notes et les remarques
        assignment.note = null;
        assignment.remarques = null;
        assignment.rendu = false;

        this.assignmentsService.updateAssignment(assignment)
          .subscribe(() => {
            this._snackBar.open("Assignement transférré vers non-rendu", "Fermer");
            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex,
            );
          });
      }
      
    }
  }

}
