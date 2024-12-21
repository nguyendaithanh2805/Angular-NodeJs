import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../services/Order/order.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    RouterLink,
    MatSelectModule
  ],
  templateUrl: './orders.component.html',
  styleUrls: [
    './orders.component.css',
    '/src/assets/users/css/style.min.css',
    '/src/assets/users/css/style.min.css',
    '/src/assets/users/libs/owlcarousel/assets/owl.carousel.min.css',
    '/src/assets/users/libs/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
  ]
})
export class OrdersComponent {
  orderForm: FormGroup;
  errorMessage: string | null = null;

  paymentMethod = [
    { name: 'Thanh toán online' },
    { name: 'Thanh toán trực tiếp' }
  ];
  
  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.orderForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      address: ['', Validators.required]
    })
  }
  onOrder(): void {

  }
}
