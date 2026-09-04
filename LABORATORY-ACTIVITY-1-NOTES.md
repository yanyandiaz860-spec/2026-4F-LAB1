# LABORATORY ACTIVITY 1 – CAPSTONE MOBILE PROTOTYPE

## 1. Objective

Develop an Ionic-Angular mobile prototype based on selected features/modules of the existing capstone project and apply the concepts discussed in Unit 1.

## 2. Project Concept

This prototype is a restaurant ordering mobile app for a dining establishment. It focuses on the following features:

- Home screen / landing screen
- Menu browsing with category filters
- Shopping cart and order summary
- Search for dishes
- Add-to-cart functionality

## 3. Selected Features / Modules

### Feature 1: Home / Customer Ordering Screen

Purpose:

- shows the dining experience and quick access to menu sections
- displays search and featured items
- allows order type selection and cart item visibility

### Feature 2: Menu Module

Purpose:

- lets users browse food categories
- displays menu items with pricing and item details
- supports add-to-cart interaction and navigation to cart

### Feature 3: Cart Module

Purpose:

- shows selected items
- allows quantity changes and order placement
- demonstrates service-based state management

## 4. Requirements Check vs. Our Implementation

| Requirement               | Implemented? | Evidence                                                                                 | Status |
| ------------------------- | -----------: | ---------------------------------------------------------------------------------------- | ------ |
| Service                   |          Yes | Menu and cart data are stored in service classes under src/app/services                  | Pass   |
| Routing / routerLink      |          Yes | Navigation links exist between home, menu, and cart pages                                | Pass   |
| Reusable Components       |          Yes | Reusable UI components for category pills and menu cards are used                        | Pass   |
| Angular Binding           |          Yes | Interpolation, property binding, event binding, and ngModel are used                     | Pass   |
| @for and @if              |          Yes | Used in the home, menu, and cart templates for loops and conditional rendering           | Pass   |
| UI/UX / Mobile Adaptation |          Yes | Mobile-first layout, cards, buttons, spacing, and search flow are designed for phone use | Pass   |
| Static data / prototype   |          Yes | The app uses sample restaurant data instead of a real backend                            | Pass   |

## 5. Key Technical Evidence

### Service Implementation

- Menu data and item filtering logic: src/app/services/menu.service.ts
- Cart state and order totals: src/app/services/cart.service.ts

### Routing / Navigation

- Route definitions: src/app/app.routes.ts
- Navigation links across pages: src/app/home/home.page.html, src/app/menu/menu.page.html, src/app/cart/cart.page.html

### Reusable Components

- Category pill component: src/app/components/category-pill/category-pill.component.ts
- Menu card component: src/app/components/menu-card/menu-card.component.ts

### Angular Binding and Conditionals

- Search binding and state handling: src/app/home/home.page.ts and src/app/home/home.page.html
- @if and @for usage: src/app/home/home.page.html, src/app/menu/menu.page.html, src/app/cart/cart.page.html

## 6. Code Snippets Used

### Service Example: MenuService

```ts
@Injectable({
  providedIn: "root",
})
export class MenuService {
  getFeaturedItems(): MenuItem[] {
    return this.menuItems.filter((item) => item.featured).slice(0, 4);
  }

  searchItems(query: string): MenuItem[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return this.menuItems;
    }

    return this.menuItems.filter((item) => {
      const text = `${item.name} ${item.category} ${item.description}`.toLowerCase();
      return text.includes(normalized);
    });
  }
}
```

### Service Example: CartService

```ts
@Injectable({
  providedIn: "root",
})
export class CartService {
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

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
```

### Routing Example: app.routes.ts

```ts
export const routes: Routes = [
  {
    path: "home",
    loadComponent: () => import("./home/home.page").then((m) => m.HomePage),
  },
  {
    path: "menu",
    loadComponent: () => import("./menu/menu.page").then((m) => m.MenuPage),
  },
  {
    path: "cart",
    loadComponent: () => import("./cart/cart.page").then((m) => m.CartPage),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];
```

### Reusable Component Example: CategoryPillComponent

```ts
@Component({
  selector: "app-category-pill",
  standalone: true,
  template: `
    <button class="category-pill" [class.selected]="selected" type="button">
      {{ label }}
    </button>
  `,
})
export class CategoryPillComponent {
  @Input() label = "Category";
  @Input() selected = false;
}
```

### Template Example: @for and @if with routerLink

```html
<section class="category-strip" aria-label="Food categories">
  @for (category of visibleCategories; track category) {
  <button type="button" class="category-button" [class.is-active]="selectedCategory === category" (click)="onCategoryChange(category)">{{ category }}</button>
  }
</section>

@if (filteredItems.length === 0) {
<div class="empty-category">No items available for {{ selectedCategory }} yet.</div>
} @else {
<section class="menu-grid">
  @for (item of filteredItems; track item.id) {
  <app-menu-card [item]="item" (addItem)="onAddItem($event)"></app-menu-card>
  }
</section>
}
```

### Example of Navigation Button

```html
<button class="assist-button" type="button" [routerLink]="['/cart']">Cart ({{ cartService.getCount() }})</button>
```

## 7. How It Fits the Rubric

This project is aligned with the rubric because it clearly demonstrates all required criteria:

- Service Implementation (15 pts): implemented through a menu service and cart service
- Routing / routerLink (10 pts): clear page navigation between home, menu, and cart
- Reusable Components (20 pts): category pills and menu cards are reused meaningfully
- Angular Binding (15 pts): data binding is used in the UI and forms/search controls
- @for and @if (10 pts): repeated and conditional content are properly used
- UI/UX & Mobile Adaptation (15 pts): mobile-first prototype layout is designed for app use
- Demonstration & Individual Understanding (15 pts): ready for oral explanation and live demonstration

## 8. Suggested Presentation Flow

### Demo Script (3–5 minutes)

1. Open the home page and explain the purpose of the restaurant ordering prototype.
2. Show the search feature and the featured items section.
3. Navigate to the menu page using the See All button.
4. Explain category filters and how the item cards are reused.
5. Add an item to the cart and show the cart count update.
6. Open the cart page and explain the quantity controls and total summary.
7. Explain the service architecture and how Angular data flow works.
8. Mention that the prototype uses static data and is designed as a mobile mockup, not a full backend-connected app.

## 9. Short Talking Points for Defense

- The prototype uses sample data to simulate a real restaurant ordering experience.
- Services are used to centralize menu and cart logic.
- Reusable components make the app cleaner and easier to maintain.
- Angular binding is used for dynamic UI updates and search interactions.
- @for and @if are used for rendering repeated and conditional content.
- The design is adapted for mobile screens and the flow is easy to understand.

## 10. Final Assessment

The current project is a valid and strong match for LABORATORY ACTIVITY 1 because it satisfies the required implementation areas and demonstrates the Angular/Ionic concepts required by the instructions.

This is a good prototype to present as a capstone mobile prototype for the lab activity.
