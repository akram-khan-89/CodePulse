import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';
import { CategoryService } from '../services/category-service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private router = inject(Router);
  constructor() {
    effect(() => {
      if (this.categoryService.addCategoryStatus() === 'Success') {
        this.categoryService.addCategoryStatus.set('idle');

        //redirect back to category list page
        this.router.navigate(['/admin/categories']);
      }
      if (this.categoryService.addCategoryStatus() === 'Error') {
        console.log('error');
      }
    });
  }

  private categoryService = inject(CategoryService);

  // 1) import ReactiveFormModule
  // 2) create FormGroups -> FormControls

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    urlHandle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] })
  });

  get nameFormControl() {
    return this.addCategoryFormGroup.controls.name;
  }

  get urlHandleFormControl() {
    return this.addCategoryFormGroup.controls.urlHandle;
  }

  onSubmit() {
    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

    const addCategoryRequestDto: AddCategoryRequest = {
      name: addCategoryFormValue.name,
      urlHandle: addCategoryFormValue.urlHandle
    };

    this.categoryService.addCateggory(addCategoryRequestDto);

  }
}
