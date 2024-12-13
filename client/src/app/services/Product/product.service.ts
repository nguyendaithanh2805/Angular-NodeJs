import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../common/ApiResponse';
import { Product } from '../../models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url = 'http://localhost:3000/api/admin/products';

  constructor(private http: HttpClient) { }

  /*
    GET: /api/admin/products?page=1&limit=5
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

  /*
    GET: /api/admin/products/{{id}}
    response:
      {
        "success": true,
        "message": "Product retrieved successfully with id 3.",
        "data": {
            "productId": 3,
            "categoryId": 9,
            "name": " Product",
            "description": "This is a test product.",
            "discount": "10.00",
            "image": "sample-image-url.jpg",
            "quantity": 100,
            "sellingPrice": "200.00"
        }
      }
  */
  getProductById(): Observable<ApiResponse<{products: Product}>> {
    return this.http.get<ApiResponse<{products: Product}>>(`${this.url}`)
      .pipe(
        map(response => response)
      );
  }

  /*
    POST: /api/admin/products
    response:
      {
        "success": true,
        "message": "Created product succesfully",
        "data": {
            "productId": 4
        }
      }
  */
  addProduct(product: Product): Observable<ApiResponse<{productId: number}>> {
    return this.http.post<ApiResponse<{productId: number}>>(`${this.url}`, product);
  }

  /*
    PUT: /api/admin/products/{{id}}
    response: No Content
  */
  updateProduct(product: Product, id: number): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, product);
  }

    /*
    DELETE: /api/admin/products/{{id}}
    response: No Content
  */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
