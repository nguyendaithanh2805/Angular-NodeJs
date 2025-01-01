import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/Auth/authentication.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css',
    '/src/assets/admins/css/bootstrap.min.css',
    '/src/assets/admins/css/animate.css',
    '/src/assets/admins/plugins/select2/css/select2.min.css',
    '/src/assets/admins/css/dataTables.bootstrap4.min.css',
    '/src/assets/admins/plugins/fontawesome/css/fontawesome.min.css',
    '/src/assets/admins/plugins/fontawesome/css/all.min.css',
    '/src/assets/admins/css/style.css'
  ]
})
export class NavbarComponent {
  constructor(private authService: AuthenticationService, private router: Router) {}
  
  logout(): void {
    this.authService.clearToken();
    alert('Đăng xuất thành công.');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
