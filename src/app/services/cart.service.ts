import { Injectable } from '@angular/core';
import { MenuItem } from './menu.service';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];

  addItem(item: MenuItem): void {
    const existing = this.items.find((cartItem) => cartItem.id === item.id);

    if (existing) {
      existing.quantity += 1;
      return;
    }

    this.items.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
  }

  removeItem(itemId: number): void {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  changeQuantity(itemId: number, change: number): void {
    const target = this.items.find((item) => item.id === itemId);
    if (!target) {
      return;
    }

    target.quantity += change;
    if (target.quantity <= 0) {
      this.removeItem(itemId);
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clear(): void {
    this.items = [];
  }
}
