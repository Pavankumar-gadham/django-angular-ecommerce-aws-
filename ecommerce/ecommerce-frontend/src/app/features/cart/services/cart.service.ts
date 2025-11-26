import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart_items';

  addToCart(product: any): void {
    const current = this.getCart();
    const exists = current.find((p: any) => p.id === product.id);

    if (exists) {
      exists.quantity += 1;
    } else {
      current.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(this.cartKey, JSON.stringify(current));
  }

  getCart(): any[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  removeItem(id: number): void {
    const updated = this.getCart().filter((p) => p.id !== id);
    localStorage.setItem(this.cartKey, JSON.stringify(updated));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
