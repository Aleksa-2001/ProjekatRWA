import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt'
import { authInterceptor } from './shared/services/auth.interceptor';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { authReducer } from './store/auth/auth.reducer';
import { prodavnicaReducer } from './store/prodavnica/prodavnica.reducer';
import { proizvodReducer } from './store/proizvod/proizvod.reducer';

import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { ProdavniceEffects } from './store/prodavnica/prodavnica.effects';
import { ProizvodiEffects } from './store/proizvod/proizvod.effects';
import { recenzijaReducer } from './store/recenzija/recenzija.reducer';
import { RecenzijeEffects } from './store/recenzija/recenzija.effects';

const jwtOptions: JwtModuleOptions = {
  config: {
    tokenGetter: () => localStorage.getItem('token'),
    allowedDomains: ["http://localhost:4200"],
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideStore({ 
      auth: authReducer, 
      prodavnice: prodavnicaReducer, 
      proizvodi: proizvodReducer,
      recenzije: recenzijaReducer
    }), 
    provideStoreDevtools({ maxAge: 25 /*, logOnly: !isDevMode()*/ }),
    provideEffects([
      AuthEffects, 
      ProdavniceEffects, 
      ProizvodiEffects,
      RecenzijeEffects
    ]),
    importProvidersFrom(JwtModule.forRoot(jwtOptions)),
  ]
};
