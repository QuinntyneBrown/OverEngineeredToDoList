// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoDialogComponent } from './to-do-dialog.component';

describe('ToDoDialogComponent', () => {
  let component: ToDoDialogComponent;
  let fixture: ComponentFixture<ToDoDialogComponent>;

  beforeEach(async () => {
    // ARRANGE
    await TestBed.configureTestingModule({
      declarations: [ ToDoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // ARRANGE
    fixture = TestBed.createComponent(ToDoDialogComponent);
    component = fixture.componentInstance;
    // ACT
    fixture.detectChanges();
  });

    // Test ID

  it('should create', () => {
    // ASSERT
    expect(component).toBeTruthy();
  });
});


