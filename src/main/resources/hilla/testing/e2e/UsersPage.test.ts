import { test, expect } from '@playwright/test';

// tag::snippet[]
test('should list all users', async ({ page }) => {
  await page.goto('/');
  const rows = await page.getByTestId('users').getByRole('row').all();

  const names = await Promise.all(rows.map(async (row) => {
    const cells = await row.getByRole('cell').all();
    return cells.map((cell) => cell.textContent()).join(' ');
  }));

  expect(names).toEqual(["John Doe", "Jane Doe"]);
});
// end::snippet[]
