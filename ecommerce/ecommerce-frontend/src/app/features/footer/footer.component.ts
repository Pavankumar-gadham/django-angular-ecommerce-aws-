import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../categories/category.model';
import { CategoryService } from '../categories/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  categories$: Observable<Category[]>;
  currentYear = new Date().getFullYear();

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }
}
