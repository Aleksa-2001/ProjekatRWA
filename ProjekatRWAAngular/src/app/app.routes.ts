import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { AngularComponent } from './components/angular/angular.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { AuthGuard, AuthRedirectGuard } from './shared/services/auth.guard';
import { RegisterComponent } from './shared/components/register/register.component';
import { ProfileComponent } from './shared/components/profile/profile.component';

export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: 'full' },
    { path: "rxjs", component: RxjsComponent },
    { path: "ng", component: AngularComponent, canActivate: [AuthGuard] },

    { path: "login", component: AuthComponent, canActivate: [AuthRedirectGuard] },
    { path: "register", component: RegisterComponent, canActivate: [AuthRedirectGuard] },
    { path: "profile/:userID", component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuard] },

    { path: "**", component: NotFoundComponent }
];
