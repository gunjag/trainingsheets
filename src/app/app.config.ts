import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
    importProvidersFrom(MatNativeDateModule)
  ]
};
