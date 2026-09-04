import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonSearchbar } from '@ionic/angular';
import { MenuCardComponent } from '../components/menu-card/menu-card.component';
import { CategoryPillComponent } from '../components/category-pill/category-pill.component';
import { CartService } from '../services/cart.service';
import { MenuItem, MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonSearchbar,
    MenuCardComponent,
    CategoryPillComponent,
  ],
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  searchTerm = '';
  selectedCategory = 'APPETIZER';
  groupedSections: Array<{ title: string; categories: string[]; items: MenuItem[] }> = [];

  constructor(
    private menuService: MenuService,
    public cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.groupedSections = this.menuService.getGroupedSections();
    this.route.queryParamMap.subscribe((params) => {
      const category = params.get('category');
      if (category) {
        this.selectedCategory = category.toUpperCase();
      }
      this.syncCategorySelection();
    });
  }

  get visibleCategories(): string[] {
    return [...new Set(this.groupedSections.flatMap((section) => section.categories))];
  }

  get filteredItems(): MenuItem[] {
    const source = this.groupedSections.flatMap((section) => section.items);
    const query = this.searchTerm.trim().toLowerCase();

    return source.filter((item) => {
      const matchesCategory = item.category === this.selectedCategory;
      const matchesQuery = !query || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }

  get cartCount(): number {
    return this.cartService.getCount();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category.toUpperCase();
  }

  onAddItem(item: MenuItem): void {
    this.cartService.addItem(item);
    this.searchTerm = '';
  }

  private syncCategorySelection(): void {
    const allCategories = this.visibleCategories;
    if (!allCategories.includes(this.selectedCategory)) {
      this.selectedCategory = allCategories[0] ?? 'APPETIZER';
    }
  }
}
