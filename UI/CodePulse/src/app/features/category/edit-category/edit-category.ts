import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  constructor() {
    effect(() => {
      if (this.categoryService.updateCategoryStatus() === 'Success') {
        this.categoryService.updateCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);
      }
      if (this.categoryService.updateCategoryStatus() === 'Error') {
        this.categoryService.updateCategoryStatus.set('idle');
        console.error('something went wrong!');
      }
    });
  }
  //input single for category id
  id = input<string>();

  //injecting the category service class and caching inside a private variable
  private categoryService = inject(CategoryService);

  //injecting the router because after successful update we need to navigate to the category listing page
  private router = inject(Router);

  //caching the reference of the getCategoryById method
  categoryResourceRef = this.categoryService.getCategoryById(this.id);
  categoryResponse = this.categoryResourceRef.value;

  editCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    urlHandle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] })
  });

  get nameFormControl() {
    return this.editCategoryFormGroup.controls.name;
  }

  get urlHandleFormControl() {
    return this.editCategoryFormGroup.controls.urlHandle;
  }

  effectReference = effect(() => {
    this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name ?? '');
    this.editCategoryFormGroup.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle ?? '');

  });

  onSubmit() {
    const id = this.id();
    if (!this.editCategoryFormGroup.valid || !id) {
      return;
    }

    const formRawValue = this.editCategoryFormGroup.getRawValue();
    const updateCategoryRequestDto: UpdateCategoryRequest = {
      name: formRawValue.name,
      urlHandle: formRawValue.urlHandle
    }

    this.categoryService.updateCategory(id, updateCategoryRequestDto);
  }

  deleteCategory() {
    const id = this.id();
    if (!id) {
      return;
    }

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.router.navigate(['/admin/categories']);
      },
      error: () => {
        console.error('something went wrong!');
      }
    });

  }

}

