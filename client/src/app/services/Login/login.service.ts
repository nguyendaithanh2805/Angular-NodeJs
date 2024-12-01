import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiResponse } from '../../common/ApiResponse';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../Auth/authentication.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly url = 'http://localhost:3000';
  
  constructor(
      private http: HttpClient,
      private authService: AuthenticationService,
      private router: Router
  ) { }

  /*
    url: http://localhost:3000/api/login
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
    return this.http.post<ApiResponse<{user: User; token: string}>>(`${this.url}/api/login`, {username, password})
          .pipe(tap({
              next: (response) => {
                if (response.success) {
                  this.authService.setToken(response.data.token);

                  if (response.data.user.roleId === 1)
                    this.router.navigate(['/admin/users']);
                  this.router.navigate(['/menu']);

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
