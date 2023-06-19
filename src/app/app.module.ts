import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatSliderModule} from '@angular/material/slider';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';  
import { MatSelectModule } from '@angular/material/select';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { AssignmentsDragAndDropComponent } from './components/assignments-drag-and-drop/assignments-drag-and-drop.component';
import {NgFor} from '@angular/common';

import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AssignmentDialogEditComponent } from './components/assignment-dialog-edit/assignment-dialog-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'assignments',
    component: AssignmentsComponent
  },
  {
    path: 'add',
    component: AddAssignmentComponent
  },
  {
    path: 'assignments/:id',
    component: AssignmentDetailComponent
  },
  {
    path: 'assignments/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    SidenavComponent,
    AssignmentsDragAndDropComponent,
    AssignmentDialogEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, RouterModule.forRoot(routes),
    HttpClientModule,
    MatNativeDateModule, ScrollingModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatListModule, MatCardModule, MatCheckboxModule, MatSlideToggleModule,
    MatTableModule, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatSnackBarModule,
    CdkDropListGroup, CdkDropList, NgFor, CdkDrag, MatDialogModule, MatSliderModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
