// src/app/features/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from '../categories/category.service';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // categories observable used by template
  categories$: Observable<any[]>;

  // featured products array
  featuredProducts: any[] = [];
  loadingFeatured = false;

  // fallback image (tool-generated image). Path provided from local uploads.
  fallbackGeneratedImage = '/mnt/data/A_collection_of_five_digital_photographs_arranged_.png';

  // map category name -> asset path (put your images in src/assets/categories/)
  categoryImages: Record<string, string> = {
    Fashion: 'assets/fashion.webp',
    Electronics: 'assets/electronics.jpg',
    Beauty: 'assets/beauty.jpg',
    Books: 'assets/books.jpg',
    Groceries: 'assets/groceries.jpg'
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    // normalize backend response into an array of categories
    this.categories$ = this.categoryService.getCategories().pipe(
      map((resp: any) => Array.isArray(resp) ? resp : (resp?.results ?? resp?.data ?? []))
    );
  }

  ngOnInit(): void {
    this.loadFeatured();
  }

  // load featured products (uses existing ProductService.getProducts with params)
  loadFeatured(): void {
    this.loadingFeatured = true;
    this.productService.getProducts({ featured: true }).subscribe({
      next: (res: any) => {
        const products = Array.isArray(res) ? res : (res?.results ?? res?.data ?? []);
        this.featuredProducts = (products || []).slice(0, 4);
        this.loadingFeatured = false;
      },
      error: err => {
        console.error('Failed to load featured products', err);
        this.featuredProducts = [];
        this.loadingFeatured = false;
      }
    });
  }

  // product image resolver
  imageForProduct(p: any): string {
    // adapt to your API shape: try common fields, then fallback
    if (!p) return this.fallbackGeneratedImage;
    // if product has images array e.g. p.images[0].url
    if (Array.isArray(p.images) && p.images.length > 0) {
      const first = p.images[0];
      return first?.url ?? first;
    }
    return p?.image ?? p?.thumbnail ?? p?.cover ?? this.fallbackGeneratedImage;
  }

  // category image resolver
  imageForCategory(cat: any): string {
    if (!cat) return this.fallbackGeneratedImage;
    const name = (cat?.name || '').trim();
    // first try explicit map
    if (this.categoryImages[name]) {
      return this.categoryImages[name];
    }
    // then try fields on category object
    return cat?.image ?? cat?.thumbnail ?? cat?.cover ?? this.fallbackGeneratedImage;
  }

  // unified helper so template can call imageFor(item) for both products & categories
  imageFor(item: any): string {
    if (!item) return this.fallbackGeneratedImage;

    // Heuristic: products often have 'title' or 'price'
    if (item?.title || item?.price || item?.sku || item?.id && (item as any).description) {
      return this.imageForProduct(item);
    }

    // Heuristic: categories have 'name'
    if (item?.name) {
      return this.imageForCategory(item);
    }

    // fallback
    return this.fallbackGeneratedImage;
  }
}
