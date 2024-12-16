import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../../models/Products';
import { CategoryService } from '../../../../services/Category/category.service';
import { ProductService } from '../../../../services/Product/product.service';
import { Category } from '../../../../models/Category';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  displayedColumns: string[] = ['categoryName', 'name', 'description', 'discount', 'image', 'quantity', 'sellingPrice', 'actions'];
  products: Product[] = [];
  categories: Category[] = [];
  errorMessage: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts(); 
  }
  
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(response => {
      if (response.success) {
        this.categories = response.data.categories || [];
        this.errorMessage = null;

        this.loadProducts();
      } else {
        this.errorMessage = response.message;
      }
    });
  }
  

  loadProducts(): any {
    this.productService.getAllProducts().subscribe(response => {
      if (response.success) {
        this.products = response.data.products.map(product => ({
          /*
          Sử dụng toán tử trải rộng ...product thay cho:
             let updatedProduct = {
              productId: product.productId,
              name: product.name,
              categoryId: product.categoryId,
              description: product.description,
              discount: product.discount,
              image: product.image,
              quantity: product.quantity,
              sellingPrice: product.sellingPrice,
              categoryName: 'Không có'
            };
          */
          ...product, categoryName: this.getCategoryNameById(product.categoryId)
        }));
        this.errorMessage = null;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  getCategoryNameById(categoryId: number): string {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category ? category.name : 'Không có';
  }

  editProduct(productId: number) {
    this.router.navigate(['/admin/edit-product', productId]);
  }

  deleteProduct(productId: number) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
    if (confirmDelete) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          alert('Sản phẩm đã được xóa thành công.');
          this.router.navigate(['/admin/product-list']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          alert('Có lỗi xảy ra khi xóa sản phẩm.');
          console.error(err);
        }
      });
    }
  }
}
