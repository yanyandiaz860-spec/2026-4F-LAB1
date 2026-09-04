import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then((m) => m.MenuPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
