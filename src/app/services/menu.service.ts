import { Injectable } from '@angular/core';

export type MenuSection = 'Foods' | 'Cafe' | 'Bistro';

export interface MenuItem {
  id: number;
  name: string;
  section: MenuSection;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  available: boolean;
  featured?: boolean;
  badge?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Pale Pilsen',
      section: 'Bistro',
      category: 'BEER',
      price: 85,
      image:
        'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
      description: 'Refreshing local beer with a crisp finish and smooth body.',
      stock: 12,
      available: true,
      featured: true,
    },
    {
      id: 2,
      name: 'San Miguel Apple',
      section: 'Bistro',
      category: 'BEER',
      price: 85,
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
      description: 'Crisp, fruity apple taste with a clean, light finish.',
      stock: 15,
      available: true,
      featured: true,
    },
    {
      id: 3,
      name: 'San Miguel Light',
      section: 'Bistro',
      category: 'BEER',
      price: 85,
      image:
        'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
      description: 'Light-bodied beer crafted for a smooth, easy-drinking taste.',
      stock: 11,
      available: true,
      featured: true,
    },
    {
      id: 4,
      name: 'Chimicuri Pork Asado',
      section: 'Foods',
      category: 'PORK',
      price: 290,
      image:
        'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
      description: 'Slow-cooked pork with savory glaze and a rich house seasoning.',
      stock: 7,
      available: true,
      featured: true,
    },
    {
      id: 5,
      name: 'French Fries',
      section: 'Foods',
      category: 'APPETIZER',
      price: 120,
      image:
        'https://images.unsplash.com/photo-1576106443727-548f0a3ec55c?auto=format&fit=crop&w=900&q=80',
      description: 'Crispy golden fries served with house seasoning and ketchup.',
      stock: 18,
      available: true,
      featured: false,
    },
    {
      id: 6,
      name: 'Classic Burger',
      section: 'Foods',
      category: 'APPETIZER',
      price: 160,
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
      description: 'Grilled beef patty, melted cheese, and toasted brioche bun.',
      stock: 10,
      available: true,
      featured: false,
    },
    {
      id: 7,
      name: 'Chicken Alfredo Pasta',
      section: 'Foods',
      category: 'PASTA',
      price: 220,
      image:
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80',
      description: 'Creamy pasta with roasted chicken and parmesan sauce.',
      stock: 9,
      available: true,
      featured: false,
    },
    {
      id: 8,
      name: 'Calamansi Shake',
      section: 'Cafe',
      category: 'NON-COFFEE',
      price: 110,
      image:
        'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
      description: 'Citrus refreshment with a cool, tangy, and creamy finish.',
      stock: 16,
      available: true,
      featured: false,
    },
    {
      id: 9,
      name: 'Iced Latte',
      section: 'Cafe',
      category: 'COFFEE',
      price: 125,
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      description: 'Well-balanced espresso with milk over ice.',
      stock: 14,
      available: true,
      featured: false,
    },
    {
      id: 10,
      name: 'Hot Tea',
      section: 'Cafe',
      category: 'HOT TEA',
      price: 90,
      image:
        'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80',
      description: 'Fragrant tea served warm and comforting.',
      stock: 13,
      available: true,
      featured: false,
    },
    {
      id: 11,
      name: 'Chicken Adobo',
      section: 'Foods',
      category: 'CHICKEN',
      price: 260,
      image:
        'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
      description: 'Tender chicken simmered in a savory soy-vinegar glaze.',
      stock: 8,
      available: true,
      featured: false,
    },
    {
      id: 12,
      name: 'Beef Kare-Kare',
      section: 'Foods',
      category: 'BEEF',
      price: 340,
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
      description: 'Rich peanut-based stew with tender beef cuts.',
      stock: 6,
      available: true,
      featured: false,
    },
    {
      id: 13,
      name: 'Fresh Lumpia',
      section: 'Foods',
      category: 'APPETIZER',
      price: 150,
      image:
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
      description: 'Crispy spring rolls with savory vegetable filling.',
      stock: 12,
      available: true,
      featured: false,
    },
    {
      id: 14,
      name: 'Mango Float',
      section: 'Foods',
      category: 'DESSERT',
      price: 170,
      image:
        'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
      description: 'Creamy layered dessert with ripe mango and biscuits.',
      stock: 9,
      available: true,
      featured: false,
    },
    {
      id: 15,
      name: 'Iced Lemonade',
      section: 'Cafe',
      category: 'ICE BLENDED',
      price: 120,
      image:
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
      description: 'House-made lemonade blended with crushed ice and citrus notes.',
      stock: 17,
      available: true,
      featured: false,
    },
  ];

  getMenuItems(): MenuItem[] {
    return [...this.menuItems];
  }

  getFeaturedItems(): MenuItem[] {
    return this.menuItems.filter((item) => item.featured).slice(0, 4);
  }

  getCategories(): string[] {
    return [...new Set(this.menuItems.map((item) => item.category))];
  }

  getCategoryItems(category: string): MenuItem[] {
    return this.menuItems.filter((item) => item.category === category);
  }

  getGroupedSections(): Array<{ title: MenuSection; categories: string[]; items: MenuItem[] }> {
    return (['Foods', 'Cafe', 'Bistro'] as MenuSection[]).map((section) => {
      const categories = [...new Set(this.menuItems.filter((item) => item.section === section).map((item) => item.category))];
      return {
        title: section,
        categories,
        items: this.menuItems.filter((item) => item.section === section),
      };
    });
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
