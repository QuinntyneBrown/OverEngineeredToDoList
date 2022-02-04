import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoDialogComponent } from './to-do-dialog.component';

describe('ToDoDialogComponent', () => {
  let component: ToDoDialogComponent;
  let fixture: ComponentFixture<ToDoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
