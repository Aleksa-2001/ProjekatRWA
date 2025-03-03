import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { AngularComponent } from './components/angular/angular.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "rxjs", component: RxjsComponent },
    { path: "ng", component: AngularComponent },
];
