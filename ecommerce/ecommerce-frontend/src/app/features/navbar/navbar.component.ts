import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from '../categories/category.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  isAuthenticated = false;
  selectedCategories: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    // 🔥 Subscribe to auth changes
    this.authService.authState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        this.isAuthenticated = status;
      });

    this.loadCategories();
  }

  ngOnDestroy(): void { 
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCategories(): void {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.categories = Array.isArray(data)
            ? data
            : (data?.results ?? data?.data ?? []);
        },
        error: (err) => {
          console.error('Error loading categories', err);
          this.categories = [];
        }
      });
  }

  onCategorySelect(category: any, event: any): void {
    if (event?.target?.checked) {
      if (!this.selectedCategories.includes(category.name)) {
        this.selectedCategories.push(category.name);
      }
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category.name);
    }

    const queryParams: any = {};
    if (this.selectedCategories.length > 0) {
      queryParams['category'] = this.selectedCategories;
    }

    this.router.navigate(['/products'], { queryParams });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
