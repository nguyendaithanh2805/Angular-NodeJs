import { Routes } from '@angular/router';
import { HomeComponent } from './users/components/home/home.component';
import { MenuComponent } from './users/components/menu/menu.component';
import { LoginComponent } from './users/components/login/login.component';
import { UserListComponent } from './admins/components/users/user-list/user-list.component';
import { AdminComponent } from './admins/admin.component';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './users/components/app-layout/app-layout.component';
import { authRoleGuard } from './guards/auth-role.guard';
import { ForbiddenComponent } from './users/components/forbidden/forbidden.component';

export const routes: Routes = [
    // App layout
    { 
      path: '',
      component:AppLayoutComponent,
      children: [
        { path: '', component: HomeComponent},
        { path: 'home', component: HomeComponent },
        { path: 'menu', component: MenuComponent },
        { path: 'login', component: LoginComponent},
        { path: 'forbidden', component: ForbiddenComponent}
      ]
    },

    //Admins
    { 
      path: 'admin', 
      component: AdminComponent,
      canActivate: [authRoleGuard],
      children: [
        { path: 'user-list', component: UserListComponent},
      ]
    }
];
