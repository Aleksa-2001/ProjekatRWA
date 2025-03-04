import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { AngularComponent } from './components/angular/angular.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "rxjs", component: RxjsComponent },
    { path: "ng", component: AngularComponent },

    { path: "**", component: NotFoundComponent }
];
