import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { CategoryList } from './features/category/category-list/category-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CategoryList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CodePulse');
}
