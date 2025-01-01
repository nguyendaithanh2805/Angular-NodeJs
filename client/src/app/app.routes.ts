import { Routes } from '@angular/router';
import { HomeComponent } from './users/components/home/home.component';
import { MenuComponent } from './users/components/menu/menu.component';
import { LoginComponent } from './users/components/login/login.component';
import { UserListComponent } from './admins/components/users/user-list/user-list.component';
import { AdminComponent } from './admins/admin.component';
import { AppLayoutComponent } from './users/components/app-layout/app-layout.component';
import { authRoleGuard } from './guards/auth-role.guard';
import { ForbiddenComponent } from './users/components/forbidden/forbidden.component';
import { RegisterComponent } from './users/components/register/register.component';
import { UserUpdateComponent } from './admins/components/users/user-update/user-update.component';
import { CategoriesComponent } from './admins/components/categories/category-list/categories.component';
import { CategoryFormComponent } from './admins/components/categories/category-form/category-form.component';
import { ProductListComponent } from './admins/components/products/product-list/product-list.component';
import { ProductFormComponent } from './admins/components/products/product-form/product-form.component';
import { ShoppingCartComponent } from './users/components/shopping-cart/shopping-cart.component';
import { OrdersComponent } from './users/components/orders/orders.component';
import { OrdersForAdminComponent } from './admins/components/orders-for-admin/orders-for-admin.component';


export const routes: Routes = [
    // App layout
    { 
      path: '',
      component:AppLayoutComponent,
      children: [
        { path: '', component: HomeComponent},
        { path: 'home', component: HomeComponent },
        { path: 'menu', component: MenuComponent },
        { path: 'login', component: LoginComponent },
        { path: 'forbidden', component: ForbiddenComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'shopping-cart', component: ShoppingCartComponent },
        { path: 'order', component: OrdersComponent },
      ]
    },

    //Admins
    { 
      path: 'admin', 
      component: AdminComponent,
      canActivate: [authRoleGuard],
      children: [
        { path: 'user-list', component: UserListComponent },
        { path: 'edit-user/:id', component: UserUpdateComponent },
        { path: 'category-list', component: CategoriesComponent },
        { path: 'edit-category/:id', component: CategoryFormComponent },
        { path: 'add-category', component: CategoryFormComponent },
        { path: 'product-list', component: ProductListComponent },
        { path: 'add-product', component: ProductFormComponent },
        { path: 'edit-product/:id', component: ProductFormComponent }, 
        { path: 'order-list', component: OrdersForAdminComponent }
      ]
    }
];
