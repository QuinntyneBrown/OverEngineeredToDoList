// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDosComponent } from './to-dos.component';

describe('ToDosComponent', () => {
  let component: ToDosComponent;
  let fixture: ComponentFixture<ToDosComponent>;

  beforeEach(async () => {
    // ARRANGE
    await TestBed.configureTestingModule({
      declarations: [ ToDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // ARRANGE
    fixture = TestBed.createComponent(ToDosComponent);
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


