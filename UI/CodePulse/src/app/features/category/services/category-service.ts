import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;
  // private apiBaseUrl = 'https://localhost:7281';

  constructor(){
    console.log('apiBaseUrl:', this.apiBaseUrl);
  }

  addCategoryStatus = signal<'idle' | 'Loading' | 'Success' | 'Error'>('idle');

  addCateggory(category: AddCategoryRequest) {
    this.addCategoryStatus.set('Loading');
    this.http.post<void>(`${this.apiBaseUrl}/api/Categories`, category).subscribe({
      next: () => {
        this.addCategoryStatus.set('Success');
      },
      error: () => {
        this.addCategoryStatus.set('Error');
      }
    });
  }

  getAllCategories() {
    return httpResource<Category[]>(() => `${this.apiBaseUrl}/api/Categories`);
  }

  getCategoryById(id: InputSignal<string | undefined>){
    return httpResource<Category>(()=>`${this.apiBaseUrl}/api/Categories/${id()}`);
  }

}
