import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  selectedFilter = 'all';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getMyOrders(this.selectedFilter).subscribe({
      next: (res) => {
        this.orders = res.results ? res.results : res;
      },
      error: (err) => console.error('Failed to load orders', err)
    });
  }

  onFilterChange(value: string) {
    this.selectedFilter = value;
    this.loadOrders();
  }
}
