import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  increaseQuantity(item: any): void {
    item.quantity += 1;
    localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
    } else {
      this.removeItem(item.id);
    }
    this.calculateTotal();
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }
    this.router.navigate(['/orders/checkout']);
  }
}
