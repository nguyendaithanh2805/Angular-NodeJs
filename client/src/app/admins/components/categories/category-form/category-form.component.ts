import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../services/Category/category.service';

@Component({
  selector: 'app-category-form',
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
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit{
  AddOrUpdateForm: FormGroup;
  errorMessage: string | null = null;
  categoryId!: number;
  isEdit = false;
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) {
    this.AddOrUpdateForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoryId)
      this.isEdit = true;
    this.getCategoryById(this.categoryId);
  }

  save(): void{
    const name = this.AddOrUpdateForm.value.name;
    if (this.isEdit) {
      this.categoryService.updateCategory(this.categoryId, name).subscribe({
        next: () => {
          alert('Cập nhật loại sản phẩm thành công!');
          this.router.navigate(['/admin/category-list']);
        },
        error: (err) => {
          if (err.error?.message?.includes("Data too long for column 'name'")) {
            alert('Tên loại sản phẩm quá dài. Vui lòng nhập tên ngắn hơn.');
          } else {
            alert('Đã xảy ra lỗi khi cập nhật loại sản phẩm!');
          }
          console.error(err);
        }
      })
    } else {
      this.categoryService.addCategory(name).subscribe({
        next: () => {
          alert('Thêm loại sản phẩm thành công!');
          this.router.navigate(['/admin/category-list']);
        },
        error: (err) => {
          this.errorMessage = 'Đã xảy ra lỗi khi thêm loại sản phẩm!';
          console.error(err);
        }
      });
    }
  }

  getCategoryById(categoryId: number): void {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (response) => {
        if (response.success)
          this.AddOrUpdateForm.patchValue(response.data);
      }
    })
  }
}
