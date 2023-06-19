import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsDragAndDropComponent } from './assignments-drag-and-drop.component';

describe('AssignmentsDragAndDropComponent', () => {
  let component: AssignmentsDragAndDropComponent;
  let fixture: ComponentFixture<AssignmentsDragAndDropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentsDragAndDropComponent]
    });
    fixture = TestBed.createComponent(AssignmentsDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
