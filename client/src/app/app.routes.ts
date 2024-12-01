import { Routes } from '@angular/router';
import { HomeComponent } from './users/components/home/home.component';
import { MenuComponent } from './users/components/menu/menu.component';
import { LoginComponent } from './users/components/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'login', component: LoginComponent}
];
