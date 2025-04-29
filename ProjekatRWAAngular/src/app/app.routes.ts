import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { AngularComponent } from './components/angular/angular.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { AuthGuard, AuthRedirectGuard, RolesGuard, ValidateGuard } from './shared/services/auth.guard';
import { RegisterComponent } from './shared/components/register/register.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ProdavnicaPageComponent } from './components/angular/prodavnice/prodavnica-page/prodavnica-page.component';

export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: 'full' },

    { path: "rxjs", component: RxjsComponent },

    { path: "ng", component: AngularComponent, canActivate: [AuthGuard, ValidateGuard] },
    { path: "ng/prodavnica/:id", component: ProdavnicaPageComponent, canActivate: [AuthGuard, /*RolesGuard*/] },

    { path: "login", component: AuthComponent, canActivate: [AuthRedirectGuard] },
    { path: "register", component: RegisterComponent, canActivate: [AuthRedirectGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard, ValidateGuard] },

    { path: "**", component: NotFoundComponent }
];
