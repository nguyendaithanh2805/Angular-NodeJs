import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Product } from '../../../models/Products';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../../services/Menu/menu.service';
import { CartService } from '../../../services/Cart/cart.service';
import { Cart } from '../../../models/Cart';
import { AuthenticationService } from '../../../services/Auth/authentication.service';
import { DecodeToken } from '../../../services/Author/DecodeToken';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css',
    '/src/assets/users/css/style.min.css',
    '/src/assets/users/css/style.min.css',
    '/src/assets/users/libs/owlcarousel/assets/owl.carousel.min.css',
    '/src/assets/users/libs/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
  ]
})
export class MenuComponent {
  displayedColumns: string[] = ['name', 'description', 'discount', 'image', 'quantity', 'sellingPrice', 'actions'];
  products: Product[] = [];
  errorMessage: string | null = null;
  quantities: Map<number, number> = new Map(); 
  
  constructor(
    private menuService: MenuService,
    private cartService: CartService,
    private decodedToken: DecodeToken
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): any {
    this.menuService.getAllProducts().subscribe(response => {
      if (response.success) {
        this.products = response.data.products;

        this.products.forEach(product => {
          this.quantities.set(product.productId, 1);
        });

        this.errorMessage = null;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

 incrementQuantity(productId: number, maxQuantity: number): void {
    const currentQuantity = this.quantities.get(productId) || 1;
    if (currentQuantity < maxQuantity) {
      this.quantities.set(productId, currentQuantity + 1);
    }
  }

  decrementQuantity(productId: number): void {
    const currentQuantity = this.quantities.get(productId) || 1;
    if (currentQuantity > 1) {
      this.quantities.set(productId, currentQuantity - 1);
    }
  }


  addToCart(product: Product): void {
    const quantities = this.quantities.get(product.productId) || 1;
    const cart: Cart = {
      userId: this.decodedToken.getPayload().userId,
      productId: product.productId,
      quantity: quantities,
      totalBill: product.sellingPrice * quantities,
    };

    this.cartService.addCart(cart).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Thêm vào giỏ hàng thành công!', response.message);
        } else {
          console.error('Thêm vào giỏ hàng thất bại:', response.message);
        }
      },
      error: (err) => {
        console.error('Lỗi khi thêm vào giỏ hàng:', err);
      },
    })
  }
}
