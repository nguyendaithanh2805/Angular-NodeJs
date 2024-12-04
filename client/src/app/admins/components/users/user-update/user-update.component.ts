import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RegisterService } from '../../../../services/Register/register.service';

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
    RouterLinkActive,],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onEdit(): void {
    if (this.registerForm.valid) {
      const {username, password} = this.registerForm.value;
      this.errorMessage = null;
      this.registerService.register(username, password).subscribe({
        next: (response) => {
            if (!response.success)
              this.errorMessage = response.message;
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = "Tài khoản đã tồn tại trên hệ thống";
          } else {
            this.errorMessage = "Xảy ra lỗi không xác định";
          }
        } 
      });
    }
  };
}
