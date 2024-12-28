import { Component } from '@angular/core';
import { OrderService } from '../../../services/Order/order.service';
import { Order } from '../../../models/Order';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-orders-for-admin',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './orders-for-admin.component.html',
  styleUrl: './orders-for-admin.component.css'
})
export class OrdersForAdminComponent {
  displayedColumns: string[] = [
    'orderId', 'userId', 'name', 'order_quantity', 
    'totalBill', 'orderDate', 'deliveryDate', 'address', 'status'
  ];

  orders: Order[] = [];
  pendingOrders: Order[] = [];
  approvedOrders: Order[] = [];
  errorMessage: string | null = null;

  constructor(
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }
  
  loadOrders(): any {
    this.orderService.getAllOrder().subscribe({
      next: (response) => {
        if (response.success)
          this.orders = response.data.orders.map(order => ({
            ...order,
            orderDate: new Date(order.orderDate),
            deliveryDate: new Date(order.deliveryDate)
          }));

          this.pendingOrders = this.orders.filter(order => order.status === 0);
          this.approvedOrders = this.orders.filter(order => order.status === 1);
          
      },
      error: (err) => {
        this.errorMessage = 'Đã xảy ra lỗi không xác định';
        console.error(err);
      }
    })
  }

   // Hàm cập nhật trạng thái đơn hàng
   updateOrderStatus(orderId: number, status: number): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
          alert('Cập nhật trạng thái đơn hàng thành công');
          this.loadOrders();
      },
      error: (err) => {
        console.error(err);
        alert('Đã xảy ra lỗi khi cập nhật trạng thái');
      }
    });
  }
}
