import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { AngularComponent } from './components/angular/angular.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { AuthGuard, AuthRedirectGuard } from './shared/services/auth.guard';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: AuthComponent, canActivate: [AuthRedirectGuard] },
    { path: "rxjs", component: RxjsComponent },
    { path: "ng", component: AngularComponent, canActivate: [AuthGuard] },

    { path: "**", component: NotFoundComponent }
];
