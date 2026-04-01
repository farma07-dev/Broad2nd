import { test, expect } from '@playwright/test';
import { InvoiceTablePage } from './invoice-approval-table.locators';

test.describe('Invoice Approval Table Actions', () => {
  let invoicePage: InvoiceTablePage;

  test.beforeEach(async ({ page }) => {
    invoicePage = new InvoiceTablePage(page);
    await invoicePage.goto();
  });

  test('Clicking Approve invoice updates that row status to approved', async () => {
    const invoiceId = 'INV-2026-001';
    const approveBtn = invoicePage.getApproveButton(invoiceId);
    const statusBadge = invoicePage.getStatusBadge(invoiceId);

    // Verify initial state
    await expect(statusBadge).toHaveText('Pending');

    // Trigger action
    await approveBtn.click();

    // Deterministic wait for status change
    await expect(statusBadge).toHaveText('Approved');
    await expect(statusBadge).toHaveClass(/approved/);
  });

  test('Clicking Reject invoice updates that row status to rejected', async () => {
    const invoiceId = 'INV-2026-002';
    const rejectBtn = invoicePage.getRejectButton(invoiceId);
    const statusBadge = invoicePage.getStatusBadge(invoiceId);

    await expect(statusBadge).toHaveText('Pending');

    // Trigger action
    await rejectBtn.click();

    // Deterministic wait for status change
    await expect(statusBadge).toHaveText('Rejected');
    await expect(statusBadge).toHaveClass(/rejected/);
  });

  test('Keyboard navigation (Tab) and action trigger (Enter) works for action buttons', async ({ page }) => {
    const invoiceId = 'INV-2026-003';
    const approveBtn = invoicePage.getApproveButton(invoiceId);
    const statusBadge = invoicePage.getStatusBadge(invoiceId);

    await expect(statusBadge).toHaveText('Pending');

    // Focus the table to give a stable starting point for Tabbing
    await invoicePage.table.focus();

    // Simulate Tab navigation to reach the target button
    let isFocused = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      isFocused = await approveBtn.evaluate(node => document.activeElement === node);
      if (isFocused) break;
    }

    // Assert that the button is reachable via Tab
    expect(isFocused, 'Expected Approve button to be reachable via Tab navigation').toBeTruthy();

    // Trigger action via Enter
    await page.keyboard.press('Enter');

    // Verify status updates
    await expect(statusBadge).toHaveText('Approved');
  });
});
