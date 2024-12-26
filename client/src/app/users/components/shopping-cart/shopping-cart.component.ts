import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CartService } from '../../../services/Cart/cart.service';
import { DecodeToken } from '../../../services/Author/DecodeToken';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../../services/Menu/menu.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [MatTableModule, CommonModule, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css',
    '/src/assets/users/css/style.min.css',
    '/src/assets/users/css/style.min.css',
    '/src/assets/users/libs/owlcarousel/assets/owl.carousel.min.css',
    '/src/assets/users/libs/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
  ]
})
export class ShoppingCartComponent  implements OnInit {
  displayedColumns: string[] = ['productName', 'image', 'sellingPrice', 'quantity', 'totalBill'];
  carts: any[] = [];

  constructor(
    private cartService: CartService, 
    private decodedToken: DecodeToken,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadCarts(this.decodedToken.getPayload().userId);
  }

  loadCarts(userId: number): void {
    this.cartService.getCartByUserId(userId).subscribe((response) => {
      if (response.success)
        this.carts = response.data;
      else
        alert(response.message);
    });
  }
}
