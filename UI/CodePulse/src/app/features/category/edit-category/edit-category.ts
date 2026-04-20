import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  //input single for category id
  id = input<string>();

  //injecting the category service class and caching inside a private variable
  private categoryService = inject(CategoryService);

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
    console.log(this.editCategoryFormGroup.getRawValue());
    console.log(this.id());
  }

}

