import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

    /*
      GET: /api/admin/orders
      reponse:
        {
          "success": true,
          "message": "Orders retrieved successfully",
          "data": {
              "orders": [
                  {
                      "orderId": 4,
                      "paymentMethod": "Thẻ tín dụng",
                      "userId": 21,
                      "orderDate": "2024-12-27T19:25:47.000Z",
                      "deliveryDate": "2024-12-30T12:25:47.000Z",
                      "status": 0,
                      "address": "123 Đường Ví Dụ, Thành phố, Quốc gia",
                      "productId": 2,
                      "discount": "0.15",
                      "quantity": 3,
                      "totalBill": "75000.00"
                  }
              ]
          }
        }
    */
    getAllOrder(): Observable<ApiResponse<{orders: Order[]}>> {
      return this.http.get<ApiResponse<{orders: Order[]}>>(`${this.url}/admin/orders`)
      .pipe(
        map(response => response)
      );
    }

    updateOrderStatus(orderId: number, status: number): Observable<void> {
      return this.http.patch<void>(`${this.url}/admin/orders/${orderId}`, { status })
    }
}
