import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../common/ApiResponse';
import { Order } from '../../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly url = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

      /*
      POST: /api/orders
      response:
        {
          "success": true,
          "message": "Created order succesfully",
          "data": {
              "orderId": 2
          }
        }
    */

    addOrders(order: Order): Observable<ApiResponse<{orderId: number}>> {
      return this.http.post<ApiResponse<{orderId: number}>>(`${this.url}/orders`, order);
    }
}
