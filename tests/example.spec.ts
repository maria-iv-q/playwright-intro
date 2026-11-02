import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('GitHub navigation bar', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const gitHubNavigationBar = page.locator('[class="navbar__item navbar__link header-github-link"]')
  await expect(gitHubNavigationBar).toBeVisible();
});

test('Discord navigation bar', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const discordNavigationBar = page.getByRole('link', { name: 'Discord server' })
  await expect(discordNavigationBar).toBeVisible();
});

test('System mode bar', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const systemModeBar = page.locator('[class="toggleIcon_g3eP systemToggleIcon_QzmC"]')
  await expect(systemModeBar).toBeVisible();
});
