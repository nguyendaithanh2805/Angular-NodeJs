import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../services/User/user.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    RouterLink,
    MatSelectModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit{
  registerForm: FormGroup;
  errorMessage: string | null = null;
  userId!: number;
  roles = [
    { id: 1, label: 'Quyền quản trị' },
    { id: 2, label: 'Quyền người dùng' }
  ];

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id')); // lay id tu url
    this.getUserById(this.userId);
  }

  onEdit(): void {
    if (this.registerForm.valid) {
      const {username, password, roleId } = this.registerForm.value;
      this.errorMessage = null;
      const userId = this.userId;
      this.userService.updateUser(userId, { username, password, roleId }).subscribe({
        next: () => {
          alert("Cập nhật thành công!");
          this.router.navigate(['/admin/user-list']);
        },
        error: (error) => {
          if (error.status === 404) {
            this.errorMessage = error.error?.message || "Người dùng không tồn tại.";
          } else {
            this.errorMessage = "Xảy ra lỗi không xác định";
          }
        } 
      });
    }
  };

  getUserById(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (response) => {
        if (response.success)
          this.registerForm.patchValue(response.data)
      }
    })
  };
}
