/**
 * Mock Playwright MCP Server
 *
 * Provides mock implementations for browser automation.
 */

import type { PlaywrightMockConfig, PageSnapshot, ElementInfo, MockResponse } from './types';

export class MockPlaywright {
  private pages: Record<string, PageSnapshot> = {};
  private currentPage: PageSnapshot | null = null;
  private consoleMessages: Array<{ level: string; text: string }> = [];
  private networkRequests: Array<{ url: string; method: string; status: number }> = [];

  constructor(config: PlaywrightMockConfig = {}) {
    this.pages = config.pages || this.getDefaultPages();
  }

  async browser_navigate(params: { url: string }): Promise<MockResponse<PageSnapshot>> {
    const page = this.pages[params.url];
    if (!page) {
      // Create a basic page for unknown URLs
      this.currentPage = {
        url: params.url,
        title: 'Page',
        content: `<html><body>Mock page for ${params.url}</body></html>`,
        elements: [],
      };
    } else {
      this.currentPage = page;
    }

    return { success: true, data: this.currentPage };
  }

  async browser_snapshot(): Promise<MockResponse<PageSnapshot>> {
    if (!this.currentPage) {
      return { success: false, error: 'No page loaded' };
    }
    return { success: true, data: this.currentPage };
  }

  async browser_click(params: {
    element: string;
    ref: string;
  }): Promise<MockResponse<void>> {
    if (!this.currentPage) {
      return { success: false, error: 'No page loaded' };
    }

    const element = this.currentPage.elements?.find(e => e.ref === params.ref);
    if (!element) {
      return { success: false, error: `Element not found: ${params.ref}` };
    }

    // Simulate click action
    this.consoleMessages.push({ level: 'info', text: `Clicked: ${params.element}` });
    return { success: true };
  }

  async browser_type(params: {
    element: string;
    ref: string;
    text: string;
    submit?: boolean;
  }): Promise<MockResponse<void>> {
    if (!this.currentPage) {
      return { success: false, error: 'No page loaded' };
    }

    // Simulate typing
    this.consoleMessages.push({
      level: 'info',
      text: `Typed "${params.text}" into ${params.element}`,
    });

    if (params.submit) {
      this.consoleMessages.push({ level: 'info', text: 'Form submitted' });
    }

    return { success: true };
  }

  async browser_fill_form(params: {
    fields: Array<{ name: string; ref: string; type: string; value: string }>;
  }): Promise<MockResponse<void>> {
    if (!this.currentPage) {
      return { success: false, error: 'No page loaded' };
    }

    for (const field of params.fields) {
      this.consoleMessages.push({
        level: 'info',
        text: `Filled ${field.name} with ${field.value}`,
      });
    }

    return { success: true };
  }

  async browser_take_screenshot(params?: {
    filename?: string;
  }): Promise<MockResponse<string>> {
    if (!this.currentPage) {
      return { success: false, error: 'No page loaded' };
    }

    const filename = params?.filename || `screenshot-${Date.now()}.png`;
    return { success: true, data: `/mock/screenshots/${filename}` };
  }

  async browser_console_messages(params?: {
    level?: string;
  }): Promise<MockResponse<Array<{ level: string; text: string }>>> {
    let messages = this.consoleMessages;

    if (params?.level) {
      const levels = ['error', 'warning', 'info', 'debug'];
      const levelIndex = levels.indexOf(params.level);
      messages = messages.filter(m => levels.indexOf(m.level) <= levelIndex);
    }

    return { success: true, data: messages };
  }

  async browser_network_requests(): Promise<
    MockResponse<Array<{ url: string; method: string; status: number }>>
  > {
    return { success: true, data: this.networkRequests };
  }

  async browser_wait_for(params: {
    text?: string;
    time?: number;
  }): Promise<MockResponse<void>> {
    // Simulate waiting
    if (params.time) {
      await new Promise(resolve => setTimeout(resolve, Math.min(params.time, 100)));
    }
    return { success: true };
  }

  async browser_close(): Promise<MockResponse<void>> {
    this.currentPage = null;
    return { success: true };
  }

  // Default pages for testing
  private getDefaultPages(): Record<string, PageSnapshot> {
    return {
      'https://checkout.stripe.com/test': {
        url: 'https://checkout.stripe.com/test',
        title: 'Stripe Checkout',
        content: '<html><body>Stripe Checkout Page</body></html>',
        elements: [
          { ref: 'card-number', type: 'input', attributes: { placeholder: 'Card number' } },
          { ref: 'card-expiry', type: 'input', attributes: { placeholder: 'MM / YY' } },
          { ref: 'card-cvc', type: 'input', attributes: { placeholder: 'CVC' } },
          { ref: 'submit-btn', type: 'button', text: 'Pay' },
        ],
      },
      'https://example.com/checkout': {
        url: 'https://example.com/checkout',
        title: 'Checkout',
        content: '<html><body>Checkout Page</body></html>',
        elements: [
          { ref: 'email', type: 'input', attributes: { type: 'email' } },
          { ref: 'card-element', type: 'div', attributes: { id: 'card-element' } },
          { ref: 'pay-button', type: 'button', text: 'Complete Purchase' },
        ],
      },
    };
  }

  // Test utilities
  addPage(url: string, page: PageSnapshot): void {
    this.pages[url] = page;
  }

  simulateNetworkRequest(request: { url: string; method: string; status: number }): void {
    this.networkRequests.push(request);
  }

  simulateConsoleMessage(level: string, text: string): void {
    this.consoleMessages.push({ level, text });
  }

  reset(): void {
    this.pages = this.getDefaultPages();
    this.currentPage = null;
    this.consoleMessages = [];
    this.networkRequests = [];
  }
}
