// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@shared';

@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatDialogModule,
    HeaderComponent
  ]
})
export class AppComponent { }

