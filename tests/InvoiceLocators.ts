import { Page, Locator, expect } from '@playwright/test';

export const InvoiceLocators = {
  /**
   * Main Invoice Grid
   * Justification: Uses the accessible ARIA role and label, making it highly resilient to DOM changes while ensuring the table is properly announced.
   */
  getInvoiceGrid: (page: Page): Locator => 
    page.getByRole('grid', { name: 'Invoices pending approval' }),

  /**
   * Specific Invoice Row
   * Justification: Locates the row based on its semantic role and the unique Invoice ID text, ensuring we target the correct item regardless of row order.
   */
  getInvoiceRow: (page: Page, invoiceId: string): Locator => 
    page.getByRole('row').filter({ hasText: invoiceId }),

  /**
   * Approve Button
   * Justification: Targets the explicit `aria-label` which is specifically designed for screen readers, ensuring tests act exactly like an assistive technology user.
   */
  getApproveButton: (rowLocator: Locator, invoiceId: string): Locator => 
    rowLocator.getByRole('button', { name: `Approve invoice ${invoiceId}` }),

  /**
   * Reject Button
   * Justification: Directly targets the reject action using its accessible role and name, avoiding fragile class names.
   */
  getRejectButton: (rowLocator: Locator, invoiceId: string): Locator => 
    rowLocator.getByRole('button', { name: `Reject invoice ${invoiceId}` }),

  /**
   * Status Badge
   * Justification: Status spans lack a unique interactive role. A `data-testid` ('invoice-status') provides a clean, decoupled way to assert status text changes without relying on styling classes.
   */
  getStatusBadge: (rowLocator: Locator): Locator => 
    rowLocator.getByTestId('invoice-status'),

  /**
   * Screen Reader Announcer (Live Region)
   * Justification: Validating the live region is critical for A11y testing. The ID/role is standard and stable.
   */
  getAnnouncer: (page: Page): Locator => 
    page.locator('#announcer')
};

// ==========================================
// Example Usage Snippet
// ==========================================

/*
test('should approve an invoice and announce it to screen readers', async ({ page }) => {
  const invoiceId = 'INV-2026-001';
  
  // To use getByTestId, we need to add data-testid="invoice-status" to the status span in our HTML
  const row = InvoiceLocators.getInvoiceRow(page, invoiceId);
  
  // Verify initial state
  await expect(InvoiceLocators.getStatusBadge(row)).toHaveText('Pending');
  
  // Perform Action via keyboard-accessible button
  await InvoiceLocators.getApproveButton(row, invoiceId).click();
  
  // Assert Status Change
  await expect(InvoiceLocators.getStatusBadge(row)).toHaveText('Approved');
  
  // Assert Accessibility Announcement (Live Region)
  await expect(InvoiceLocators.getAnnouncer(page)).toHaveText(`Invoice ${invoiceId} approved.`);
});
*/