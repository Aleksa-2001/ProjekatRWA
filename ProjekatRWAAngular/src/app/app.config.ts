import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt'
import { authInterceptor } from './shared/services/auth.interceptor';

import { Action, ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { localStorageSync } from "ngrx-store-localstorage";

import { authReducer } from './store/auth/auth.reducer';
import { prodavnicaReducer } from './store/prodavnica/prodavnica.reducer';
import { proizvodReducer } from './store/proizvod/proizvod.reducer';
import { recenzijaReducer } from './store/recenzija/recenzija.reducer';

import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { ProdavniceEffects } from './store/prodavnica/prodavnica.effects';
import { ProizvodiEffects } from './store/proizvod/proizvod.effects';
import { RecenzijeEffects } from './store/recenzija/recenzija.effects';
import { AppState } from './store/app-state';

const jwtOptions: JwtModuleOptions = {
  config: {
    tokenGetter: () => {
      const auth = localStorage.getItem('auth')
      return auth ? JSON.parse(auth).token : null
    },
    allowedDomains: ["http://localhost:4200"],
  }
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: AppState | undefined, action: Action) {
    console.log('state', state)
    console.log('action', action)

    return reducer(state, action)
  }
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  console.log('localStorage metareducer radi')
  return localStorageSync({ 
    keys: [{ auth: ["token"] }], 
    rehydrate: true, 
    storage: localStorage
  })(reducer)
}

export const metaReducers: MetaReducer<any>[] = [debug, localStorageSyncReducer]

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
    }, { metaReducers: metaReducers }), 
    provideStoreDevtools({ maxAge: 25 , logOnly: !isDevMode() }),
    provideEffects([
      AuthEffects, 
      ProdavniceEffects, 
      ProizvodiEffects,
      RecenzijeEffects
    ]),
    importProvidersFrom(JwtModule.forRoot(jwtOptions)),
  ]
};
