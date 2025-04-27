import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { KomponenteEffects } from './store/komponenta/komponenta.effects';
import { AuthEffects } from './store/auth/auth.effects';
import { komponentaReducer } from './store/komponenta/komponenta.reducer';
import { authReducer } from './store/auth/auth.reducer';
import { prodavnicaReducer } from './store/prodavnica/prodavnica.reducer';
import { ProdavniceEffects } from './store/prodavnica/prodavnica.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    provideStore({ 
      auth: authReducer, 
      prodavnice: prodavnicaReducer, 
      komponente: komponentaReducer 
    }), 
    provideStoreDevtools({ maxAge: 25 /*, logOnly: !isDevMode()*/ }),
    provideEffects([
      AuthEffects, 
      ProdavniceEffects, 
      KomponenteEffects
    ])
  ]
};
