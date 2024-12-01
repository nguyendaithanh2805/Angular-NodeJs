import { Routes } from '@angular/router';
import { HomeComponent } from './users/components/home/home.component';
import { MenuComponent } from './users/components/menu/menu.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent },
    { path: 'menu', component: MenuComponent }
];
