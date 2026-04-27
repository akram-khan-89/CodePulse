import { inject, Injectable } from '@angular/core';
import { AddBlogPostRequest, BlogPost } from '../models/blogpost.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  http = inject(HttpClient);
  apiBaseUrl = environment.apiBaseUrl;

  createBlogPost(data: AddBlogPostRequest): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiBaseUrl}/api/BlogPosts`, data);
  }
}
