import { Component, input } from '@angular/core';

@Component({
  selector: 'app-edit-blogpost',
  imports: [],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css',
})
export class EditBlogpost {
  id=input<string>();
}
