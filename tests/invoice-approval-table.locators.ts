import { Page, Locator } from '@playwright/test';
import path from 'path';

export class InvoiceTablePage {
  readonly page: Page;
  readonly table: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.getByRole('grid', { name: 'Invoices pending approval' });
  }

  async goto() {
    // Navigate to the local file
    const filePath = path.join(process.cwd(), 'InvoiceApprovalTable.html');
    await this.page.goto(`file://${filePath}`);
  }

  getRow(invoiceId: string): Locator {
    // Finds the row by checking if it contains a gridcell with the specific invoice ID
    return this.page.getByRole('row').filter({ 
      has: this.page.getByRole('gridcell', { name: invoiceId, exact: true }) 
    });
  }

  getApproveButton(invoiceId: string): Locator {
    return this.getRow(invoiceId).getByRole('button', { name: `Approve invoice ${invoiceId}` });
  }

  getRejectButton(invoiceId: string): Locator {
    return this.getRow(invoiceId).getByRole('button', { name: `Reject invoice ${invoiceId}` });
  }

  getStatusBadge(invoiceId: string): Locator {
    return this.getRow(invoiceId).getByTestId('invoice-status');
  }
}
