import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  page = 1;
  totalPages = 0;
  selectedCategories: string[] = [];
  
  filters = {
    search: '',
    min_price: '' as string | number,
    max_price: '' as string | number
  };

  private searchTimeout: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const catParam = params['category'];
      this.selectedCategories = Array.isArray(catParam) 
        ? catParam 
        : catParam ? [catParam] : [];
      
      this.page = 1;
      this.loadProducts();
    });
  }

  loadProducts() {
    const queryParams: any = { 
      page: this.page, 
      page_size: 4
    };

    if (this.selectedCategories.length > 0) {
      queryParams['category'] = this.selectedCategories;
    }

    const searchValue = this.filters.search?.trim();
    if (searchValue) {
      queryParams['search'] = searchValue;
    }

    if (this.filters.min_price !== '' && this.filters.min_price !== null && this.filters.min_price !== undefined) {
      queryParams['min_price'] = Number(this.filters.min_price);
    }

    if (this.filters.max_price !== '' && this.filters.max_price !== null && this.filters.max_price !== undefined) {
      queryParams['max_price'] = Number(this.filters.max_price);
    }

    this.productService.getProducts(queryParams).subscribe({
      next: (res) => {
        this.products = res.results;
        this.totalPages = res.total_pages;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.products = [];
        this.totalPages = 0;
      }
    });
  }

  onFilterChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.page = 1; 
      this.loadProducts();
    }, 500);
  }

  clearFilters() {
    this.filters.search = '';
    this.filters.min_price = '';
    this.filters.max_price = '';
    this.page = 1;
    
    this.loadProducts();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
}
