import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { komponentaReducer } from './store/komponente.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { KomponenteEffect } from './store/komponenta.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    provideStore({ komponente: komponentaReducer /*, users: userReduces, ...*/ }), 
    provideStoreDevtools({ maxAge: 25 /*, logOnly: !isDevMode()*/ }),
    provideEffects([KomponenteEffect])]
};
