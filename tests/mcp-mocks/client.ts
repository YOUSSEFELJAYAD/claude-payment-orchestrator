/**
 * Mock MCP Client
 *
 * Unified interface for interacting with mock MCP servers.
 */

import { MockSerena } from './serena';
import { MockContext7 } from './context7';
import { MockPlaywright } from './playwright';
import { MockEpisodicMemory } from './episodic-memory';
import type { MCPMockConfig } from './types';

export class MockMCPClient {
  public serena: MockSerena;
  public context7: MockContext7;
  public playwright: MockPlaywright;
  public episodicMemory: MockEpisodicMemory;

  constructor(config: MCPMockConfig = {}) {
    this.serena = new MockSerena(config.serena);
    this.context7 = new MockContext7(config.context7);
    this.playwright = new MockPlaywright(config.playwright);
    this.episodicMemory = new MockEpisodicMemory(config.episodicMemory);
  }

  /**
   * Reset all mock servers to default state
   */
  reset(): void {
    this.serena.reset();
    this.context7.reset();
    this.playwright.reset();
    this.episodicMemory.reset();
  }

  /**
   * Get a mock server by name
   */
  getServer(name: 'serena' | 'context7' | 'playwright' | 'episodic-memory'): any {
    switch (name) {
      case 'serena':
        return this.serena;
      case 'context7':
        return this.context7;
      case 'playwright':
        return this.playwright;
      case 'episodic-memory':
        return this.episodicMemory;
      default:
        throw new Error(`Unknown server: ${name}`);
    }
  }
}

/**
 * Create a configured mock MCP client
 */
export function createMockMCP(config: MCPMockConfig = {}): MockMCPClient {
  return new MockMCPClient(config);
}

/**
 * Test helper: Create MCP mocks with payment integration setup
 */
export function createPaymentTestMocks(): MockMCPClient {
  const client = new MockMCPClient();

  // Add payment-related files
  client.serena.addFile(
    'src/payments/stripe.ts',
    `
import Stripe from 'stripe';

export class StripePaymentService {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey);
  }

  async createPaymentIntent(amount: number, currency: string) {
    return this.stripe.paymentIntents.create({ amount, currency });
  }
}
    `
  );

  // Add payment-related symbols
  client.serena.addSymbol('src/payments/stripe.ts', {
    name: 'StripePaymentService',
    kind: 'class',
    location: { file: 'src/payments/stripe.ts', line: 3, column: 0 },
    body: 'class StripePaymentService { ... }',
  });

  client.serena.addSymbol('src/payments/stripe.ts', {
    name: 'createPaymentIntent',
    kind: 'method',
    location: { file: 'src/payments/stripe.ts', line: 10, column: 2 },
    body: 'async createPaymentIntent(amount: number, currency: string) { ... }',
  });

  // Add payment-related conversations
  client.episodicMemory.addConversation({
    id: 'payment-conv-001',
    date: '2024-02-01',
    project: 'test-project',
    content: 'Discussion about payment integration patterns',
    snippets: ['Stripe PaymentIntents', 'Error handling', 'Webhook verification'],
  });

  return client;
}

/**
 * Test helper: Create MCP mocks with PCI compliance setup
 */
export function createPCITestMocks(): MockMCPClient {
  const client = new MockMCPClient();

  // Add PCI-related files
  client.serena.addFile(
    'src/security/encryption.ts',
    `
import crypto from 'crypto';

export function encryptPAN(pan: string, key: Buffer): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  // ... encryption logic
}
    `
  );

  // Add PCI memories
  client.serena.addFile(
    '.serena/memories/pci-requirements.md',
    `
# PCI DSS Requirements

## Encryption Standards
- Use AES-256 for stored data
- TLS 1.2+ for transit
- Rotate keys annually
    `
  );

  return client;
}
