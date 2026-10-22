import type { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  addToCart(productSlug: string) {
    return this.page.getByTestId(`add-to-cart-${productSlug}`);
  }

  removeFromCart(productSlug: string) {
    return this.page.getByTestId(`remove-${productSlug}`);
  }
}
