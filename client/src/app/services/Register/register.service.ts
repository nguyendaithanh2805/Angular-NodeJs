import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiResponse } from '../../common/ApiResponse';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly url = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

  /*
    POST: /api/register
    response:
      {
        "success": true,
        "message": "Created user succesfully",
        "data": {
            "userId": 4
        }
      }
  */

  register(username: string, password: string) : Observable<ApiResponse<{user: User}>> {
    return this.http.post<ApiResponse<{user: User}>>(`${this.url}/register`, {username, password})
        .pipe(
          tap({
            next: ((response) => {
              console.log(response.message);
              alert('Đăng ký thành công.');
              this.router.navigate(['/login']);
            })
          }),
          catchError((error) => {
            return throwError(() => error);
          })
        );
  }
}
