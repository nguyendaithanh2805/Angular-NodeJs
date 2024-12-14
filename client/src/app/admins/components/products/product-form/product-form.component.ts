import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../../services/Category/category.service';
import { ProductService } from '../../../../services/Product/product.service';
import { Category } from '../../../../models/Category';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    RouterLink,
    MatSelectModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  AddOrUpdateForm: FormGroup;
  errorMessage: string | null = null;
  categories: Category[] = [];
  isEdit = false;
  productId!: number;
  imageFile: File | null = null;
  imageShow: string | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private productService: ProductService) {
    this.AddOrUpdateForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      sellingPrice: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isEdit = true;
      this.loadProduct(this.productId); // Load thông tin sản phẩm
    }

    this.loadCategories();
  }

      
  loadCategories(): any {
    this.categoryService.getAllCategories().subscribe(response => {
      if (response.data.totalCategories === 0) {
        this.errorMessage = "Không có loại sản phẩm nào, vui lòng thêm mới.";
      } else if (response.success) {
        this.categories = response.data.categories;
        this.errorMessage = null;
      }
    })
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (response: any) => {
        if (response.success) {
          const product = response.data.product;
          this.AddOrUpdateForm.patchValue({
            name: product.name,
            description: product.description,
            categoryId: product.categoryId,
            discount: product.discount,
            quantity: product.quantity,
            sellingPrice: product.sellingPrice,
          });
          this.imageShow = `/uploads/${product.image}`;
        } else {
          this.errorMessage = 'Không thể tải thông tin sản phẩm.';
        }
      },
      error: () => {
        this.errorMessage = 'Lỗi khi tải thông tin sản phẩm.';
      },
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;

      // Tạo URL xem trước ảnh
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imageShow = e.target.result);
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    const productData = this.AddOrUpdateForm.value;
    const formData = new FormData();
  
    // Thêm các giá trị từ form vào FormData
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });
  
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
  
    if (this.isEdit) {
      this.productService.updateProduct(formData, this.productId).subscribe({
        next: () => {
          alert('Cập nhật sản phẩm thành công!');
          this.router.navigate(['/admin/product-list']);
        },
        error: (err) => {
          if (err.error?.message?.includes("Data too long for column 'name'")) {
            alert('Tên sản phẩm quá dài. Vui lòng nhập tên ngắn hơn.');
          } else if (err.error?.message?.includes('Cannot delete or update a parent row')) {
            alert('Không thể cập nhật sản phẩm này vì có ràng buộc dữ liệu.');
          } else {
            alert('Đã xảy ra lỗi khi cập nhật sản phẩm!');
          }
          console.error(err);
        },
      });
    } else {
      this.productService.addProduct(formData).subscribe({
        next: () => {
          alert('Thêm sản phẩm thành công!');
          this.router.navigate(['/admin/product-list']);
        },
        error: (err) => {
          this.errorMessage = 'Đã xảy ra lỗi khi thêm sản phẩm!';
          console.error(err);
        },
      });
    }
  }
  

}