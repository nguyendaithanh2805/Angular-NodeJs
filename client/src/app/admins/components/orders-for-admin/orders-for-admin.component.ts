import { Component } from '@angular/core';
import { OrderService } from '../../../services/Order/order.service';
import { Order } from '../../../models/Order';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import RobotoRegular from '../../../common/RobotoRegular';

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
            deliveryDate: new Date(order.deliveryDate),
            totalBill: parseFloat(order.totalBill.toString())
          }));

        this.orders.sort((a, b) => a.orderId - b.orderId);

        this.pendingOrders = this.orders.filter(order => order.status === 0);
        this.approvedOrders = this.orders.filter(order => order.status === 1);
      },
      error: (err) => {
        this.errorMessage = 'Đã xảy ra lỗi không xác định';
        console.error(err);
      }
    });
  }

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

  // Hàm xuất danh sách đơn hàng thành PDF
  exportOrdersToPDF(): void {
    const doc = new jsPDF();
  
    // Nhúng font Roboto
    doc.addFileToVFS('Roboto-Regular.ttf', RobotoRegular);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');
  
    doc.text('Danh sách đơn hàng đã duyệt', 14, 20);
  
    const approvedOrders = this.orders.filter(order => order.status === 1);
  
    // Dữ liệu bảng
    const tableData = approvedOrders.map(order => [
      order.orderId,
      order.userId,
      order.name,
      order.order_quantity,
      `${order.totalBill.toFixed(2)} VND`,
      order.orderDate.toLocaleDateString(),
      order.deliveryDate.toLocaleDateString(),
      order.address,
      order.status === 0 ? 'Chờ duyệt' : 'Đã duyệt'
    ]);
  
    // Tạo bảng
    (doc as any).autoTable({
      head: [['Mã đơn hàng', 'Mã người mua', 'Tên sản phẩm', 'Số lượng', 'Tổng hóa đơn', 'Ngày đặt hàng', 'Ngày giao hàng', 'Địa chỉ', 'Trạng thái']],
      body: tableData,
      startY: 30,
      styles: {
        font: 'Roboto'
      }
    });
  
    doc.save('DanhSachDonHangDaDuyet.pdf');
  }
}
