import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CartListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CartRoutingModule
  ]
})
export class CartModule { }
