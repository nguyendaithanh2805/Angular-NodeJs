import { Component } from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/User/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/Auth/authentication.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule, MatPaginatorModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: [
    './user-list.component.css',
    '/src/assets/admins/css/bootstrap.min.css',
    '/src/assets/admins/css/animate.css',
    '/src/assets/admins/plugins/select2/css/select2.min.css',
    '/src/assets/admins/css/dataTables.bootstrap4.min.css',
    '/src/assets/admins/plugins/fontawesome/css/fontawesome.min.css',
    '/src/assets/admins/plugins/fontawesome/css/all.min.css',
    '/src/assets/admins/css/style.css'
  ]
})
export class UserListComponent {
  displayedColumns: string[] = ['userId', 'roleId', 'username', 'password', 'actions'];
  users: User[] = [];
  paginatedUsers: User[] = [];
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private userService: UserService, private router: Router, private authService: AuthenticationService) {}
  
  ngOnInit(): void {
    this.loadUsers(0, 100);
  }

  loadUsers(page: number, limit: number): any {
    this.userService.getAllUsers(page, limit).subscribe((response) => {
      if (response.success) {
        this.users = response.data.users;
        this.totalUsers = response.data.totalUsers;
        this.updatePagination();
      } else {
        console.error('Không có tài khoản nào tồn tại.');
      }
    });
  }
  
  updatePagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex)
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  editUser(userId: number): void {
    this.router.navigate(['/admin/edit-user', userId]);
  }

  deleteUser(user: { userId: number, roleId: number }): void {
    if (user.roleId === 1) {
      alert('Không thể xóa tài khoản quản trị viên.');
      return;
    }

    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa người dùng này không?');
    if (confirmDelete) {
      this.userService.deleteUser(user.userId).subscribe({
        next: () => {
          alert('Người dùng đã được xóa thành công.');
          this.router.navigate(['/admin/user-list']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          alert('Có lỗi xảy ra khi xóa người dùng.');
          console.error(err);
        }
      });
    }
  }

  logout(): void {
    this.authService.clearToken();
    alert('Đăng xuất thành công.');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}