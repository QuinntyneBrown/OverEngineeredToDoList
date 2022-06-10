import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';
import { ApiModule } from '@api';
import { RouterModule } from '@angular/router';

if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        { path: '', loadComponent: () => import('./app/to-dos/to-dos.component').then(m => m.ToDosComponent) }
      ]),     
      HttpClientModule, 
      BrowserAnimationsModule,
      ApiModule.forRoot({ rootUrl: 'https://localhost:5001' })
    )
  ]
}).catch((err) => console.error(err));

