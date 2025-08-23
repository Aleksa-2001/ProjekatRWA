import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt'
import { authInterceptor } from './shared/services/auth.interceptor';

import { ActionReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { localStorageSync } from "ngrx-store-localstorage";

import { authReducer } from './store/auth/auth.reducer';
import { prodavnicaReducer } from './store/prodavnica/prodavnica.reducer';
import { proizvodReducer } from './store/proizvod/proizvod.reducer';
import { recenzijaReducer } from './store/recenzija/recenzija.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { toastReducer } from './store/toast/toast.reducer';

import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { ProdavniceEffects } from './store/prodavnica/prodavnica.effects';
import { ProizvodiEffects } from './store/proizvod/proizvod.effects';
import { RecenzijeEffects } from './store/recenzija/recenzija.effects';
import { CartEffects } from './store/cart/cart.effects';
import { ToastEffects } from './store/toast/toast.effects';

const jwtOptions: JwtModuleOptions = {
  config: {
    tokenGetter: () => {
      const auth = localStorage.getItem('auth')
      return auth ? JSON.parse(auth).token : null
    },
    allowedDomains: ["http://localhost:4200"]
  }
}

// export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
//   return function(state: AppState | undefined, action: Action) {
//     console.log('state', state)
//     console.log('action', action)

//     return reducer(state, action)
//   }
// }

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ 
    keys: [
      { auth: ["token"] },
      { cart: ['artikli'] }
    ], 
    rehydrate: true, 
    storage: localStorage
  })(reducer)
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
      recenzije: recenzijaReducer,
      cart: cartReducer,
      toast: toastReducer
    }, { metaReducers: [localStorageSyncReducer] }), 
    provideStoreDevtools({ maxAge: 25 , logOnly: !isDevMode() }),
    provideEffects([
      AuthEffects, 
      ProdavniceEffects, 
      ProizvodiEffects,
      RecenzijeEffects,
      CartEffects,
      ToastEffects
    ]),
    importProvidersFrom(JwtModule.forRoot(jwtOptions)),
  ]
};
