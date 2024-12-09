import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/Category';
import { MatTableModule } from '@angular/material/table';
import { CategoryService } from '../../../../services/Category/category.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatTableModule, CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['categoryId', 'name', 'actions'];
  categories: Category[] = [];
  errorMessage: string | null = null;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
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

  editCategory(categoryId: number) {
    this.router.navigate(['/admin/edit-category', categoryId]);
  }

  deleteCategory(categoryId: number) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa loại sản phẩm này không?');
    if (confirmDelete) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          alert('Loại sản phẩm đã được xóa thành công.');
          this.router.navigate(['/admin/category-list']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          alert('Có lỗi xảy ra khi xóa loại sản phẩm.');
          console.error(err);
        }
      });
    }
  }
}
