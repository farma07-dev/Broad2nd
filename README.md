# Invoice Approval Workflow

A pure HTML, CSS, and Vanilla JavaScript implementation of an accessible Invoice Approval Table.

## Features

- **Semantic HTML:** Fully accessible table structure with ARIA roles (`role="grid"`, `gridcell`, etc.).
- **Keyboard Navigation:** Implements a roving tabindex for accessible arrow-key grid navigation.
- **Action Shortcuts:**
  - `Arrow Keys`: Navigate the grid
  - `Tab`: Standard focus navigation
  - `A`: Quick-approve focused row
  - `R`: Quick-reject focused row
  - `Enter` / `Space`: Activate buttons natively
- **Screen Reader Support:** Includes polite live regions (`aria-live`) for immediate feedback on row actions.
- **E2E Testing:** Fully tested using Playwright.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (for running tests)
- A modern web browser

### Running the App
Since this is a static HTML/JS/CSS app, you can simply open the `InvoiceApprovalTable.html` file in your preferred browser:
```bash
open InvoiceApprovalTable.html
```
*(Or drag and drop the file into your browser window).*

### Running Tests

This project uses Playwright for End-to-End testing.

1. Install dependencies:
```bash
npm install
```

2. Run the tests in headless mode:
```bash
npm run test:e2e
```

3. Run the tests in UI mode:
```bash
npm run test:e2e:ui
```

## Architecture

- `InvoiceApprovalTable.html`: The markup structure and semantic table.
- `InvoiceApprovalTable.css`: CSS variables, styling, and accessible focus states.
- `InvoiceApprovalTable.js`: Event listeners, keyboard navigation, and DOM manipulation.
- `tests/`: Contains Playwright E2E tests (`.spec.ts`) and Page Object Models (`.locators.ts`).