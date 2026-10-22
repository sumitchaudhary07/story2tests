import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.checkoutButton = page.getByTestId('checkout');
  }
}
