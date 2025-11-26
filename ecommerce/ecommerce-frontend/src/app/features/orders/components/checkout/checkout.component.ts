import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../cart/services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  loading = false;

  address = {
  full_name: '',
  phone: '',
  address_line: '',
  city: '',
  state: '',
  pincode: ''
};


  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  placeOrder() {
  if (this.cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderData = {
    order_items: this.cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity
    })),
    shipping_address: this.address
  };

  this.loading = true;

  this.orderService.createOrder(orderData).subscribe({
    next: () => {
      this.loading = false;
      alert("Order placed successfully!");
      this.cartService.clearCart();
      this.router.navigate(['/orders']);
    },
    error: (err) => {
      this.loading = false;
      console.error(err);
      alert("Please provide your address to place order!");
    }
  });
}

}
