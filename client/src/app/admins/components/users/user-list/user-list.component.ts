import { Component } from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/User/user.service';

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
  displayedColumns: string[] = ['userId', 'roleId', 'username', 'password'];
  users: User[] = [];
  paginatedUsers: User[] = [];
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private userService: UserService) {}
  
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
}