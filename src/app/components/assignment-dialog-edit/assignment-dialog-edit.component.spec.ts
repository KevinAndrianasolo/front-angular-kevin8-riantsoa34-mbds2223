import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentDialogEditComponent } from './assignment-dialog-edit.component';

describe('AssignmentDialogEditComponent', () => {
  let component: AssignmentDialogEditComponent;
  let fixture: ComponentFixture<AssignmentDialogEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentDialogEditComponent]
    });
    fixture = TestBed.createComponent(AssignmentDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
