import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../common/ApiResponse';
import { User } from '../../models/User';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = 'http://localhost:3000/api/admin/users';
  constructor(private http: HttpClient) { }

  /*
    GET: /api/admin/users?page=1&limit=5
    response:
      {
        "success": true,
        "message": "Users retrieved successfully",
        "data": {
            "users": [
                {
                    "userId": 1,
                    "roleId": 1,
                    "username": "admin",
                    "password": "12345"
                },
                {
                    "userId": 3,
                    "roleId": 2,
                    "username": "user",
                    "password": "12345"
                },
                
            ],
            "totalUsers": 2
        }
      }
  */

  getAllUsers(page: number, limit: number): Observable<ApiResponse<{users: User[], totalUsers: number}>>{
    return this.http.get<ApiResponse<{users: User[], totalUsers: number}>>(`${this.url}?page=${page}&limit=${limit}`)
      .pipe(
        map(response => response)
      );
  }

  /*
    GET: http://localhost:3000/api/admin/users/{{id}}
    response:
      {
        "success": true,
        "message": "User retrieved successfully with id 4.",
        "data": {
            "userId": 4,
            "roleId": 2,
            "username": "ads",
            "password": "12345"
        }
      }
  */
  getUserById(id: number): Observable<ApiResponse<{user: User}>> {
    return this.http.get<ApiResponse<{user: User}>>(`${this.url}/${id}`)
      .pipe(
        map(response => response)
      );
  }
  // PUT: http://localhost:3000/api/admin/users/{{id}} => 204
  updateUser(id: number, user: Partial<User>) : Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, user);
  }

  // DELETE: http://localhost:3000/api/admin/users/{{id}}
  deleteUser(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
