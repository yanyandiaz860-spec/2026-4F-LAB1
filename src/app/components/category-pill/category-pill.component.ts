import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-pill',
  standalone: true,
  template: `
    <button class="category-pill" [class.selected]="selected" type="button">
      {{ label }}
    </button>
  `,
  styles: [
    `
      .category-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 110px;
        padding: 16px 22px;
        border: 1px solid rgba(70, 92, 52, 0.32);
        border-radius: 999px;
        background: rgba(252, 252, 249, 0.9);
        color: #2f4b2a;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        transition: all 0.2s ease;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
      }

      .category-pill.selected {
        background: rgba(105, 139, 81, 0.9);
        color: white;
        border-color: rgba(105, 139, 81, 0.8);
        box-shadow: 0 8px 20px rgba(87, 120, 69, 0.18);
      }
    `,
  ],
})
export class CategoryPillComponent {
  @Input() label = 'Category';
  @Input() selected = false;
}
