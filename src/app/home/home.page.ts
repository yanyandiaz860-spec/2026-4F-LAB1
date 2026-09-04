import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CategoryPillComponent } from '../components/category-pill/category-pill.component';
import { CartService } from '../services/cart.service';
import { MenuService, MenuItem } from '../services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonContent, CategoryPillComponent],
})
export class HomePage implements OnInit, OnDestroy {
  private readonly storageKey = 'estoria-home-state';

  greeting = 'Afternoon';
  orderType = 'Dine-in';
  searchTerm = '';
  assistanceClicks = 0;
  selectedCategory = 'APPETIZER';
  featuredItems: MenuItem[] = [];
  menuSections: Array<{ title: string; categories: string[] }> = [];
  expandedSections: Record<string, boolean> = {};
  carouselIndex = 0;
  private carouselTimer?: number;

  constructor(
    private menuService: MenuService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Morning';
    } else if (hour < 18) {
      this.greeting = 'Afternoon';
    } else {
      this.greeting = 'Evening';
    }

    this.restoreState();

    this.featuredItems = this.menuService.getFeaturedItems();
    this.menuSections = this.menuService.getGroupedSections().map((section) => ({
      title: section.title,
      categories: section.categories,
    }));

    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.carouselTimer) {
      window.clearInterval(this.carouselTimer);
    }
  }

  get activeFeaturedItem(): MenuItem | undefined {
    return this.featuredItems[this.carouselIndex];
  }

  get searchResults(): MenuItem[] {
    const query = this.searchTerm.trim().toLowerCase();
    if (!query) {
      return [];
    }

    return this.menuService.searchItems(query).slice(0, 5);
  }

  get cartCount(): number {
    return this.cartService.getCount();
  }

  toggleOrderType(type: string): void {
    this.orderType = type;
    this.saveState();
  }

  onNeedAssistance(): void {
    if (this.assistanceClicks < 3) {
      this.assistanceClicks += 1;
      this.saveState();
    }
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.saveState();
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.saveState();
  }

  toggleSection(sectionTitle: string): void {
    const current = this.expandedSections[sectionTitle] ?? false;
    this.expandedSections = {
      ...this.expandedSections,
      [sectionTitle]: !current,
    };
  }

  isSectionExpanded(sectionTitle: string): boolean {
    return !!this.expandedSections[sectionTitle];
  }

  private saveState(): void {
    const state = {
      greeting: this.greeting,
      orderType: this.orderType,
      searchTerm: this.searchTerm,
      assistanceClicks: this.assistanceClicks,
      selectedCategory: this.selectedCategory,
      carouselIndex: this.carouselIndex,
    };

    window.localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  private restoreState(): void {
    const savedState = window.localStorage.getItem(this.storageKey);
    if (!savedState) {
      return;
    }

    try {
      const state = JSON.parse(savedState) as Partial<{
        greeting: string;
        orderType: string;
        searchTerm: string;
        assistanceClicks: number;
        selectedCategory: string;
        carouselIndex: number;
      }>;

      this.greeting = state.greeting ?? this.greeting;
      this.orderType = state.orderType ?? this.orderType;
      this.searchTerm = state.searchTerm ?? this.searchTerm;
      this.assistanceClicks = state.assistanceClicks ?? this.assistanceClicks;
      this.selectedCategory = state.selectedCategory ?? this.selectedCategory;
      this.carouselIndex = state.carouselIndex ?? this.carouselIndex;
    } catch {
      window.localStorage.removeItem(this.storageKey);
    }
  }

  private startCarousel(): void {
    if (!this.featuredItems.length) {
      return;
    }

    this.carouselTimer = window.setInterval(() => {
      this.carouselIndex = (this.carouselIndex + 1) % this.featuredItems.length;
      this.saveState();
    }, 3000);
  }
}
