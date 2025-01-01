import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../services/Auth/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css',
    '/src/assets/users/css/style.min.css',
    '/src/assets/users/css/style.min.css',
    '/src/assets/users/libs/owlcarousel/assets/owl.carousel.min.css',
    '/src/assets/users/libs/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
  ]
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getToken() !== null;
  }
  
  logout(): void {
    this.authService.clearToken();
    alert('Đăng xuất thành công.');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
