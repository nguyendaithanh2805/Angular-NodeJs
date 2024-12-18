import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/Products';
import { ApiResponse } from '../../common/ApiResponse';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    private readonly url = 'http://localhost:3000/api/menus';
  
    constructor(private http: HttpClient) { }
  
    /*
      GET: /api/menus
      response:
        {
          "success": true,
          "message": "Products retrieved successfully",
          "data": {
              "products": [
                  {
                      "productId": 3,
                      "categoryId": 9,
                      "name": " Product",
                      "description": "This is a test product.",
                      "discount": "10.00",
                      "image": "sample-image-url.jpg",
                      "quantity": 100,
                      "sellingPrice": "200.00"
                  }
              ],
              "totalProducts": 1
          }
        }
    */
    getAllProducts(): Observable<ApiResponse<{products: Product[], totalproducts: number}>> {
      return this.http.get<ApiResponse<{products: Product[], totalproducts: number}>>(`${this.url}`)
        .pipe(
          map(response => response)
        );
    }
}
