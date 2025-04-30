import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { authReducer } from './store/auth/auth.reducer';
import { prodavnicaReducer } from './store/prodavnica/prodavnica.reducer';
import { ProdavniceEffects } from './store/prodavnica/prodavnica.effects';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt'
import { ProizvodiEffects } from './store/proizvod/proizvod.effects';
import { proizvodReducer } from './store/proizvod/proizvod.reducer';

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
    provideHttpClient(withFetch()),
    provideStore({ 
      auth: authReducer, 
      prodavnice: prodavnicaReducer, 
      proizvodi: proizvodReducer
    }), 
    provideStoreDevtools({ maxAge: 25 /*, logOnly: !isDevMode()*/ }),
    provideEffects([
      AuthEffects, 
      ProdavniceEffects, 
      ProizvodiEffects
    ]),
    importProvidersFrom(JwtModule.forRoot(jwtOptions)),
  ]
};
