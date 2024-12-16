import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Product } from '../../../models/Products';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/Product/product.service';
import { CommonModule } from '@angular/common';

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
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): any {
    this.productService.getAllProducts().subscribe(response => {
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
    const localQuantity = this.quantities.get(product.productId) || 1;
    console.log(`Added ${localQuantity} of ${product.name} to cart.`);
  }
}
