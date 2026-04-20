import { Component, input } from '@angular/core';

@Component({
  selector: 'app-edit-category',
  imports: [],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  id = input<string>();
}
