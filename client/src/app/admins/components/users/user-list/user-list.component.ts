import { Component } from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { User } from '../../../../models/User';

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

}
