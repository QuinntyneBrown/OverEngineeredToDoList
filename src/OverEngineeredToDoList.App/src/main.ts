import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';
import { ApiModule } from '@api';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ToDoStore } from '@shared/state/to-do.store';

if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent, {
  providers: [
    ToDoStore,
    importProvidersFrom(
      RouterModule.forRoot([
        { path: '', loadComponent: () => import('./app/to-dos/to-dos.component').then(m => m.ToDosComponent) }
      ]),     
      HttpClientModule, 
      BrowserAnimationsModule,
      ApiModule.forRoot({ rootUrl: 'https://localhost:5001' }),
      MatDialogModule
    )
  ]
}).catch((err) => console.error(err));

