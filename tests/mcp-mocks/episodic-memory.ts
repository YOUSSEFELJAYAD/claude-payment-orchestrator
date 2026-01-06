/**
 * Mock Episodic Memory MCP Server
 *
 * Provides mock implementations for conversation memory search.
 */

import type { EpisodicMemoryMockConfig, ConversationRecord, MockResponse } from './types';

export class MockEpisodicMemory {
  private conversations: ConversationRecord[] = [];

  constructor(config: EpisodicMemoryMockConfig = {}) {
    this.conversations = config.conversations || this.getDefaultConversations();
  }

  async search(params: {
    query: string | string[];
    limit?: number;
    mode?: 'vector' | 'text' | 'both';
    before?: string;
    after?: string;
  }): Promise<MockResponse<ConversationRecord[]>> {
    let results = [...this.conversations];
    const query = Array.isArray(params.query) ? params.query.join(' ') : params.query;
    const queryLower = query.toLowerCase();

    // Filter by query
    results = results.filter(
      conv =>
        conv.content.toLowerCase().includes(queryLower) ||
        conv.snippets.some(s => s.toLowerCase().includes(queryLower))
    );

    // Filter by date
    if (params.before) {
      results = results.filter(conv => conv.date < params.before!);
    }
    if (params.after) {
      results = results.filter(conv => conv.date > params.after!);
    }

    // Apply limit
    const limit = params.limit || 10;
    results = results.slice(0, limit);

    return { success: true, data: results };
  }

  async read(params: {
    path: string;
    startLine?: number;
    endLine?: number;
  }): Promise<MockResponse<string>> {
    const conversation = this.conversations.find(c => c.id === params.path);

    if (!conversation) {
      return { success: false, error: `Conversation not found: ${params.path}` };
    }

    let content = conversation.content;

    // Apply line limits
    if (params.startLine || params.endLine) {
      const lines = content.split('\n');
      const start = (params.startLine || 1) - 1;
      const end = params.endLine || lines.length;
      content = lines.slice(start, end).join('\n');
    }

    return { success: true, data: content };
  }

  // Default conversations for testing
  private getDefaultConversations(): ConversationRecord[] {
    return [
      {
        id: 'conv-001',
        date: '2024-01-15',
        project: 'payment-integration',
        content: `
User: How do I integrate Stripe Payment Intents?
Claude: To integrate Stripe Payment Intents:
1. Create a PaymentIntent on the server
2. Use Stripe Elements on the frontend
3. Handle the confirmation result
4. Listen for webhooks for async events
        `,
        snippets: [
          'Stripe Payment Intents integration',
          'Create PaymentIntent server-side',
          'Use Stripe Elements frontend',
        ],
      },
      {
        id: 'conv-002',
        date: '2024-01-20',
        project: 'pci-compliance',
        content: `
User: What are the PCI DSS requirements for storing card data?
Claude: For PCI DSS compliance when storing card data:
1. Never store CVV/CVC
2. Encrypt PAN with AES-256
3. Store keys separately from data
4. Implement access controls
5. Log all access to cardholder data
        `,
        snippets: [
          'PCI DSS card storage requirements',
          'Never store CVV',
          'Encrypt PAN with AES-256',
        ],
      },
      {
        id: 'conv-003',
        date: '2024-01-25',
        project: 'fraud-prevention',
        content: `
User: How should I implement velocity checks?
Claude: Implement velocity checks using:
1. Redis for real-time counters
2. Sliding window algorithm
3. Per-user and per-card limits
4. Different thresholds for different risk levels
        `,
        snippets: [
          'Velocity check implementation',
          'Redis counters',
          'Sliding window algorithm',
        ],
      },
    ];
  }

  // Test utilities
  addConversation(conversation: ConversationRecord): void {
    this.conversations.push(conversation);
  }

  reset(): void {
    this.conversations = this.getDefaultConversations();
  }
}
