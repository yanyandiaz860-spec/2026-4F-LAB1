import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../services/menu.service';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  template: `
    <article class="menu-card">
      <div class="image-wrap">
        <img [src]="item.image" [alt]="item.name" />
      </div>
      <div class="card-body">
        <div class="title-row">
          <h3>{{ item.name }}</h3>
          <button type="button" class="add-btn" (click)="onAdd()">+ Add</button>
        </div>
        <p class="description">{{ item.description }}</p>
        <div class="footer">
          <span class="price">₱{{ item.price }}</span>
          <span class="stock">{{ item.stock }} left</span>
        </div>
      </div>
    </article>
  `,
  styles: [
    `
      .menu-card {
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(125, 141, 120, 0.32);
        border-radius: 22px;
        overflow: hidden;
        box-shadow: 0 10px 24px rgba(58, 72, 52, 0.08);
      }

      .image-wrap {
        height: 170px;
        background: #dfe8db;
      }

      .image-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .card-body {
        padding: 12px 14px 16px;
      }

      .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 8px;
      }

      h3 {
        margin: 0;
        font-size: 0.9rem;
        color: #1d3b2a;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .description {
        margin: 0 0 12px;
        font-size: 0.7rem;
        line-height: 1.4;
        color: #5f6a5a;
        min-height: 34px;
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .price {
        font-size: 1rem;
        font-weight: 700;
        color: #1d422d;
      }

      .stock {
        font-size: 0.68rem;
        color: #5b7a4f;
      }

      .add-btn {
        border: none;
        border-radius: 999px;
        background: #e9efe6;
        color: #1d422d;
        font-weight: 700;
        padding: 8px 12px;
        font-size: 0.7rem;
      }
    `,
  ],
})
export class MenuCardComponent {
  @Input() item!: MenuItem;
  @Output() addItem = new EventEmitter<MenuItem>();

  onAdd(): void {
    this.addItem.emit(this.item);
  }
}
