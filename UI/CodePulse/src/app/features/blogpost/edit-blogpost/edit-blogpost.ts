import { Component, effect, inject, input } from '@angular/core';
import { BlogPostService } from '../services/blog-post-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';

@Component({
  selector: 'app-edit-blogpost',
  imports: [ReactiveFormsModule, MarkdownComponent],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css',
})
export class EditBlogpost {
  id = input<string>();
  blogPostService = inject(BlogPostService);
  categoryService = inject(CategoryService);

  private blogPostRef = this.blogPostService.getBlogPostById(this.id);
  blogPostResponse = this.blogPostRef.value;

  private categoriesRef = this.categoryService.getAllCategories();
  categoriesResponse = this.categoriesRef.value;

  editBlogPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)],
    }),
    shortDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(300)],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    featuredImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    isVisible: new FormControl<boolean>(true, {
      nonNullable: true,
    }),
    categories: new FormControl<string[]>([]),
  });

  effectRef = effect(() => {
    if (this.blogPostResponse()) {
      this.editBlogPostForm.patchValue({
        title: this.blogPostResponse()?.title,
        shortDescription: this.blogPostResponse()?.shortDescription,
        content: this.blogPostResponse()?.content,
        urlHandle: this.blogPostResponse()?.urlHandle,
        featuredImageUrl: this.blogPostResponse()?.featuredImageUrl,
        publishedDate: new Date(this.blogPostResponse()?.publishedDate!).toISOString().split('T')[0],
        author: this.blogPostResponse()?.author,
        isVisible: this.blogPostResponse()?.isVisible,
        categories: this.blogPostResponse()?.categories.map(x => x.id.toString()),
      });
    }

  });

  onSubmit() {
    console.log(this.editBlogPostForm.getRawValue());
  }
}
