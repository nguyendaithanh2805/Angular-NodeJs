import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/Login/login.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.errorMessage = null;
      this.loginService.login(username, password).subscribe({
        next: (response) => {
            if (!response.success)
              this.errorMessage = response.message;
        },
        error: (error) => {
          if (error.status === 401)
            this.errorMessage = 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.';
          if (error.status === 404)
            this.errorMessage = 'Tài khoản không tồn tại.';
          console.error(error);
        } 
      });
    }
  };
}
