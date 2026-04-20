import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  //injecting the category service class and caching inside a private variable
  private categoryService = inject(CategoryService);

  //caching the reference of the getAllCategories method
  private getAllCategoriesRef = this.categoryService.getAllCategories();

  //caching the loading state for getAllCategories
  isLoading = this.getAllCategoriesRef.isLoading;

  //caching the error state for getAllCategories
  isError = this.getAllCategoriesRef.error;

  //caching the success/data fetched state for getAllCategories
  value = this.getAllCategoriesRef.value;

}
