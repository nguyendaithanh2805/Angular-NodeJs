import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../common/ApiResponse';
import { Cart } from '../../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly url = 'http://localhost:3000/api/carts';

  constructor(private http: HttpClient) { }
  /*
    GET: /api/carts/{{id}}
    response:
      {
        "success": true,
        "message": "Carts retrieved successfully with user id undefined.",
        "data": [
            {
                "cartId": 1,
                "userId": 21,
                "productId": 3,
                "quantity": 6,
                "totalBill": "180000.00"
            },
            {
                "cartId": 2,
                "userId": 21,
                "productId": 2,
                "quantity": 5,
                "totalBill": "125000.00"
            }
        ]   
      }
  */
  getCartByUserId(userId: number): Observable<ApiResponse<Cart[]>> {
    return this.http.get<ApiResponse<Cart[]>>(`${this.url}/${userId}`)
      .pipe(
        map(response => response)
      );
  }

  /*
    POST: /api/carts
    response:
      {
        "success": true,
        "message": "Created cart succesfully",
        "data": {
            "cartId": 4
        }
      } 
  */
  addCart(cart: Cart): Observable<{ status: number; body: ApiResponse<{ cartId: number }> | null }> {
    return this.http.post<ApiResponse<{ cartId: number }>>(`${this.url}`, cart, {
        observe: 'response',
    }).pipe(
        map((response) => ({
            status: response.status,
            body: response.body ?? null
        }))
    );
}
}
