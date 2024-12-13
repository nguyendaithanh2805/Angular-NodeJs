import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../common/ApiResponse';
import { Category } from '../../models/Category';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly url = 'http://localhost:3000/api/admin/categories';
  constructor(private http: HttpClient) { }
  /*
    GET: /api/admin/categories?page=1&limit=5
    response:
      {
        "success": true,
        "message": "Categories retrieved successfully",
        "data": {
            "categories": [
                {
                    "categoryId": 4,
                    "name": "coffeB"
                }
            ],
            "totalCategories": 1
        }
      }
  */
  getAllCategories(): Observable<ApiResponse<{categories: Category[], totalCategories: number}>>{
    return this.http.get<ApiResponse<{categories: Category[], totalCategories: number}>>(`${this.url}`)
      .pipe(
        map(response => response)
      );
  }

  /*
    GET: /api/admin/category/{{id}}
    response:
      {
        "success": true,
        "message": "Category retrieved successfully with id 4.",
        "data": {
            "categoryId": 4,
            "name": "coffeB"
        }
      }
  */
  getCategoryById(id: number): Observable<ApiResponse<{category: Category}>> {
    return this.http.get<ApiResponse<{category: Category}>>(`${this.url}/${id}`)
      .pipe(
        map(response => response)
      );
  }

  /*
    POST: /api/admin/category
    response:
      {
        "success": true,
        "message": "Created category succesfully",
        "data": {
            "categoryId": 5
        }
      }
  */
  addCategory(name: string): Observable<ApiResponse<{ categoryId: number }>> {
    return this.http.post<ApiResponse<{ categoryId: number }>>(`${this.url}`, { name })
      .pipe(
        map(response => response)
      );
  }
  // 204
  updateCategory(id: number, name: string): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, { name });
  }
  
  // 204
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  
}
