import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path:'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
  },
  { 
    path: 'products',
    loadChildren: () =>
    import('./features/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import ('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then(m => m.UserModule),
  },
  
  { path: 'cart', 
    loadChildren: () => 
    import('./features/cart/cart.module').then(m => m.CartModule), canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
