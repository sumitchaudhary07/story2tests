import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { checkoutInfo, errors, users } from '../test-data/users';

const BACKPACK = 'sauce-labs-backpack';

test.describe('QA-101 login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('AC1 valid user lands on the Products page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventory.title).toHaveText('Products');
  });

  test('AC1 unauthenticated visit to Products redirects to login with an error', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.goto();
    await expect(page).toHaveURL('/');
    await expect(loginPage.error).toHaveText(errors.notLoggedIn);
  });

  test('AC2 locked out user sees error and stays on login page', async ({ page }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.error).toHaveText(errors.lockedOut);
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('AC3 wrong password shows credentials mismatch error', async ({ page }) => {
    await loginPage.login(users.wrongPassword.username, users.wrongPassword.password);
    await expect(loginPage.error).toHaveText(errors.credentialsMismatch);
    await expect(page).toHaveURL('/');
  });

  test('AC3 empty credentials show username required error', async () => {
    await loginPage.loginButton.click();
    await expect(loginPage.error).toHaveText(errors.usernameRequired);
  });
});

test.describe('QA-101 cart', () => {
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventory = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(inventory.title).toHaveText('Products');
  });

  test('AC4 adding a product shows cart badge with count 1', async () => {
    await inventory.addToCart(BACKPACK).click();
    await expect(inventory.cartBadge).toHaveText('1');
    await expect(inventory.removeFromCart(BACKPACK)).toBeVisible();
  });

  test('AC4 removing the product clears the cart badge', async () => {
    await inventory.addToCart(BACKPACK).click();
    await expect(inventory.cartBadge).toHaveText('1');
    await inventory.removeFromCart(BACKPACK).click();
    await expect(inventory.cartBadge).toHaveCount(0);
    await expect(inventory.addToCart(BACKPACK)).toBeVisible();
  });
});

test.describe('QA-101 checkout', () => {
  let checkout: CheckoutInfoPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    checkout = new CheckoutInfoPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventory.addToCart(BACKPACK).click();
    await inventory.cartLink.click();
    await cart.checkoutButton.click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
  });

  test('AC5 empty First Name shows "First Name is required" error', async ({ page }) => {
    await checkout.fillAndContinue({ ...checkoutInfo, firstName: '' });
    await expect(checkout.error).toHaveText(errors.firstNameRequired);
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
  });

  test('AC5 empty Last Name shows "Last Name is required" error', async ({ page }) => {
    await checkout.fillAndContinue({ ...checkoutInfo, lastName: '' });
    await expect(checkout.error).toHaveText(errors.lastNameRequired);
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
  });
});
