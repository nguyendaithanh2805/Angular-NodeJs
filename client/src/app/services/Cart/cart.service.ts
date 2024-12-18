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
        "message": "Cart retrieved successfully with user id 21.",
        "data": {
            "cartId": 4,
            "userId": 21,
            "productId": 12,
            "quantity": 2,
            "totalBill": "29.98"
        }
      }
  */
  getCartByUserId(userId: number): Observable<ApiResponse<{cart: Cart}>> {
    return this.http.get<ApiResponse<{cart: Cart}>>(`${this.url}/${userId}`)
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
  addCart(cart: Cart): Observable<ApiResponse<{cartId: number}>> {
    return this.http.post<ApiResponse<{cartId: number}>>(`${this.url}`, cart);
  }
}
