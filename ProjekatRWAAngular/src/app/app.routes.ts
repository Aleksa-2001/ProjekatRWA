import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { AuthGuard, AuthRedirectGuard } from './shared/guards/auth.guard';
import { RolesGuard } from './shared/guards/roles.guard';
import { ValidateGuard } from './shared/guards/auth-validate.guard';
import { RegisterComponent } from './shared/components/register/register.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ProdavnicaPageComponent } from './components/prodavnice/prodavnica-page/prodavnica-page.component';
import { ProizvodPageComponent } from './components/proizvodi/proizvod-page/proizvod-page.component';
import { SearchPageComponent } from './components/search/search-page/search-page.component';
import { ProdavnicePageComponent } from './components/prodavnice-page/prodavnice-page.component';
import { SelectItemComponent } from './components/select-item/select-item.component';
import { CartPageComponent } from './components/cart/cart-page/cart-page.component';
import { AboutComponent } from './shared/components/about/about.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: 'full' },

    { path: "about", component: AboutComponent },

    { path: "search", component: SearchPageComponent },
    { path: "cart", component: CartPageComponent },
    { path: "checkout", component: CheckoutComponent },
    
    { path: "prodavnice", component: ProdavnicePageComponent },
    { path: "prodavnica/:id", component: ProdavnicaPageComponent },
    { path: "proizvod/:id", component: ProizvodPageComponent },

    { path: "select/:id", component: SelectItemComponent, canActivate: [AuthGuard, ValidateGuard, RolesGuard] },

    { path: "login", component: AuthComponent, canActivate: [AuthRedirectGuard] },
    { path: "register", component: RegisterComponent, canActivate: [AuthRedirectGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard, ValidateGuard] },

    { path: "**", component: NotFoundComponent }
]
