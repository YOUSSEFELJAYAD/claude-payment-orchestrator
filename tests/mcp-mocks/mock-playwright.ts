/**
 * Mock Playwright MCP Server
 * 
 * Provides mock implementations of Playwright browser automation
 * tools for testing without real browser interactions.
 */

export interface MockPage {
  url: string;
  title: string;
  content: string;
  snapshot: string;
  consoleMessages: Array<{ level: string; text: string }>;
  networkRequests: Array<{ url: string; method: string; status: number }>;
}

export class MockPlaywright {
  private currentPage: MockPage | null = null;
  private pages: Map<string, MockPage> = new Map();
  private screenshots: Map<string, string> = new Map();

  constructor() {
    this.reset();
  }

  reset() {
    this.currentPage = null;
    this.pages.clear();
    this.screenshots.clear();
  }

  // Setup methods for tests
  addPage(url: string, page: Partial<MockPage>) {
    this.pages.set(url, {
      url,
      title: page.title || 'Mock Page',
      content: page.content || '<html><body>Mock content</body></html>',
      snapshot: page.snapshot || '- document\n  - body\n    - text: Mock content',
      consoleMessages: page.consoleMessages || [],
      networkRequests: page.networkRequests || []
    });
  }

  addConsoleMessage(url: string, level: string, text: string) {
    const page = this.pages.get(url);
    if (page) {
      page.consoleMessages.push({ level, text });
    }
  }

  addNetworkRequest(url: string, request: { url: string; method: string; status: number }) {
    const page = this.pages.get(url);
    if (page) {
      page.networkRequests.push(request);
    }
  }

  // Mock tool implementations
  async browser_navigate(params: { url: string }): Promise<{ result: string }> {
    const page = this.pages.get(params.url);
    
    if (page) {
      this.currentPage = page;
      return {
        result: JSON.stringify({
          url: page.url,
          title: page.title,
          status: 'navigated'
        })
      };
    }

    // Create default page if not mocked
    this.currentPage = {
      url: params.url,
      title: 'Page',
      content: '<html><body></body></html>',
      snapshot: '- document\n  - body',
      consoleMessages: [],
      networkRequests: []
    };

    return {
      result: JSON.stringify({
        url: params.url,
        title: 'Page',
        status: 'navigated'
      })
    };
  }

  async browser_snapshot(params?: { filename?: string }): Promise<{ result: string }> {
    if (!this.currentPage) {
      return { result: JSON.stringify({ error: 'No page loaded' }) };
    }

    return { result: this.currentPage.snapshot };
  }

  async browser_click(params: {
    element: string;
    ref: string;
  }): Promise<{ result: string }> {
    if (!this.currentPage) {
      return { result: JSON.stringify({ error: 'No page loaded' }) };
    }

    return {
      result: JSON.stringify({
        action: 'click',
        element: params.element,
        ref: params.ref,
        status: 'clicked'
      })
    };
  }

  async browser_type(params: {
    element: string;
    ref: string;
    text: string;
    submit?: boolean;
  }): Promise<{ result: string }> {
    if (!this.currentPage) {
      return { result: JSON.stringify({ error: 'No page loaded' }) };
    }

    return {
      result: JSON.stringify({
        action: 'type',
        element: params.element,
        text: params.text,
        submitted: params.submit || false,
        status: 'typed'
      })
    };
  }

  async browser_fill_form(params: {
    fields: Array<{
      name: string;
      type: string;
      ref: string;
      value: string;
    }>;
  }): Promise<{ result: string }> {
    if (!this.currentPage) {
      return { result: JSON.stringify({ error: 'No page loaded' }) };
    }

    return {
      result: JSON.stringify({
        action: 'fill_form',
        fields_filled: params.fields.length,
        status: 'filled'
      })
    };
  }

  async browser_console_messages(params?: {
    level?: string;
  }): Promise<{ result: string }> {
    if (!this.currentPage) {
      return { result: JSON.stringify([]) };
    }

    let messages = this.currentPage.consoleMessages;
    if (params?.level) {
      const levels = ['error', 'warning', 'info', 'debug'];
      const levelIndex = levels.indexOf(params.level);
      messages = messages.filter(m => levels.indexOf(m.level) <= levelIndex);
    }

    return { result: JSON.stringify(messages) };
  }

  async browser_network_requests(params?: {
    includeStatic?: boolean;
  }): Promise<{ result: string }> {
    if (!this.currentPage) {
      return { result: JSON.stringify([]) };
    }

    let requests = this.currentPage.networkRequests;
    if (!params?.includeStatic) {
      requests = requests.filter(r => 
        !r.url.match(/\.(js|css|png|jpg|gif|svg|woff|ttf)$/)
      );
    }

    return { result: JSON.stringify(requests) };
  }

  async browser_take_screenshot(params?: {
    filename?: string;
    fullPage?: boolean;
  }): Promise<{ result: string }> {
    if (!this.currentPage) {
      return { result: JSON.stringify({ error: 'No page loaded' }) };
    }

    const filename = params?.filename || `screenshot-${Date.now()}.png`;
    this.screenshots.set(filename, `[Screenshot of ${this.currentPage.url}]`);

    return {
      result: JSON.stringify({
        filename,
        url: this.currentPage.url,
        fullPage: params?.fullPage || false
      })
    };
  }

  async browser_evaluate(params: {
    function: string;
    element?: string;
    ref?: string;
  }): Promise<{ result: string }> {
    if (!this.currentPage) {
      return { result: JSON.stringify({ error: 'No page loaded' }) };
    }

    // Return mock evaluation result
    return {
      result: JSON.stringify({
        evaluated: true,
        function: params.function.substring(0, 50) + '...',
        result: null
      })
    };
  }

  async browser_wait_for(params: {
    text?: string;
    textGone?: string;
    time?: number;
  }): Promise<{ result: string }> {
    return {
      result: JSON.stringify({
        waited: true,
        condition: params.text ? `text: ${params.text}` : 
                   params.textGone ? `textGone: ${params.textGone}` :
                   `time: ${params.time}ms`
      })
    };
  }
}

// Singleton for easy test setup
export const mockPlaywright = new MockPlaywright();
