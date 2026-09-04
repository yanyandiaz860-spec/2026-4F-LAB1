import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  items: CartItem[] = [];
  orderPlaced = false;
  orderMessage = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  get itemCount(): number {
    return this.cartService.getCount();
  }

  addOne(item: CartItem): void {
    this.orderPlaced = false;
    this.cartService.changeQuantity(item.id, 1);
    this.items = this.cartService.getItems();
  }

  removeOne(item: CartItem): void {
    this.orderPlaced = false;
    this.cartService.changeQuantity(item.id, -1);
    this.items = this.cartService.getItems();
  }

  removeItem(itemId: number): void {
    this.orderPlaced = false;
    this.cartService.removeItem(itemId);
    this.items = this.cartService.getItems();
  }

  placeOrder(): void {
    if (!this.items.length) {
      this.orderPlaced = false;
      this.orderMessage = 'Your cart is empty. Add an item first.';
      return;
    }

    this.cartService.clear();
    this.items = [];
    this.orderPlaced = true;
    this.orderMessage = 'Order placed successfully! Your table is queued.';
  }
}
