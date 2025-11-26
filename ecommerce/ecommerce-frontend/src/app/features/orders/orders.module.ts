import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CheckoutComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
