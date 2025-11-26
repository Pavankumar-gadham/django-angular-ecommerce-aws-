import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { ProductService } from '../../product.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load product details.';
        this.loading = false;
      }
    });
  }

  addToCart(): void {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/auth/login']);
    return;
  }

  this.cartService.addToCart(this.product);
  alert('Item added to cart!');
}

}
