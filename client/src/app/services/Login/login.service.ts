import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiResponse } from '../../common/ApiResponse';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../Auth/authentication.service';
import { Router } from '@angular/router';
import { DecodeToken } from '../Author/DecodeToken';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly url = 'http://localhost:3000/api';
  
  constructor(
      private http: HttpClient,
      private authService: AuthenticationService,
      private router: Router
  ) { }

  /*
    POST: /api/login
    response:
      {
        "success": true,
        "message": "Login successfully",
        "data": {
            "user": {
                "userId": 3,
                "roleId": 2,
                "username": "test1"
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGVJZCI6MiwiaWF0IjoxNzMzMDU0MTAxLCJleHAiOjE3MzMwNTU5MDF9.DJtLwPw8iFqLi4Y_rhdHMFHhfyZ8Wg2jHKPOT99Cl8g"
        }
      }
  */
  login(username: string, password: string): Observable<ApiResponse<{user: User; token: string}>> {
    return this.http.post<ApiResponse<{user: User; token: string}>>(`${this.url}/login`, {username, password})
          .pipe(tap({
              next: (response) => {
                if (response.data === null)
                  throw new Error('Data is null');
                
                if (response.success) {
                  this.authService.setToken(response.data.token);
                  if (response.data.user.roleId === 1)
                    this.router.navigate(['/admin/user-list']);
                  else
                    this.router.navigate(['/menu']).then(() => {
                      window.location.reload();
                    });

                  console.log('Đăng nhập thành công:', response.data.user);
                } else {
                  console.error('Đăng nhập thất bại:', response.message);
                }
              }
            }),
          catchError((error) => {
            return throwError(() => error);
          })
        );
  }
}
