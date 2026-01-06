/**
 * Payment Orchestration Skill Tests
 *
 * Tests for the payment-orchestration skill using MCP mocks.
 */

import { describe, it, expect, beforeEach } from 'bun:test';
import { createPaymentTestMocks, MockMCPClient } from '../mcp-mocks';

describe('Payment Orchestration Skill', () => {
  let mcp: MockMCPClient;

  beforeEach(() => {
    mcp = createPaymentTestMocks();
  });

  describe('PSP Selection', () => {
    it('should find Stripe integration code', async () => {
      const result = await mcp.serena.find_symbol({
        name_path_pattern: 'StripePaymentService',
        include_body: true,
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data![0].name).toBe('StripePaymentService');
    });

    it('should retrieve Stripe documentation', async () => {
      const libraries = await mcp.context7.resolve_library_id({
        libraryName: 'stripe',
      });

      expect(libraries.success).toBe(true);
      expect(libraries.data![0].id).toBe('/stripe/stripe-node');

      const docs = await mcp.context7.query_docs({
        libraryId: '/stripe/stripe-node',
        query: 'payment intents',
      });

      expect(docs.success).toBe(true);
      expect(docs.data).toContain('PaymentIntent');
    });

    it('should search for past payment integration patterns', async () => {
      const memories = await mcp.episodicMemory.search({
        query: 'payment integration',
        limit: 5,
      });

      expect(memories.success).toBe(true);
      expect(memories.data!.length).toBeGreaterThan(0);
    });
  });

  describe('Payment Flow Analysis', () => {
    it('should find payment-related symbols', async () => {
      const result = await mcp.serena.find_symbol({
        name_path_pattern: 'createPaymentIntent',
      });

      expect(result.success).toBe(true);
      expect(result.data![0].kind).toBe('method');
    });

    it('should search for error handling patterns', async () => {
      mcp.serena.addFile(
        'src/payments/errors.ts',
        `
export function handlePaymentError(error: any) {
  if (error.type === 'card_error') {
    return { retry: false, message: error.message };
  }
  return { retry: true };
}
        `
      );

      const result = await mcp.serena.search_for_pattern({
        substring_pattern: 'handlePaymentError',
      });

      expect(result.success).toBe(true);
      expect(result.data!.matches.length).toBeGreaterThan(0);
    });
  });

  describe('Checkout Flow Testing', () => {
    it('should navigate to checkout page', async () => {
      const result = await mcp.playwright.browser_navigate({
        url: 'https://example.com/checkout',
      });

      expect(result.success).toBe(true);
      expect(result.data!.title).toBe('Checkout');
    });

    it('should find payment form elements', async () => {
      await mcp.playwright.browser_navigate({
        url: 'https://checkout.stripe.com/test',
      });

      const snapshot = await mcp.playwright.browser_snapshot();

      expect(snapshot.success).toBe(true);
      expect(snapshot.data!.elements).toBeDefined();
      expect(snapshot.data!.elements!.some(e => e.ref === 'card-number')).toBe(true);
    });

    it('should fill payment form', async () => {
      await mcp.playwright.browser_navigate({
        url: 'https://checkout.stripe.com/test',
      });

      const result = await mcp.playwright.browser_fill_form({
        fields: [
          { name: 'Card Number', ref: 'card-number', type: 'textbox', value: '4242424242424242' },
          { name: 'Expiry', ref: 'card-expiry', type: 'textbox', value: '12/25' },
          { name: 'CVC', ref: 'card-cvc', type: 'textbox', value: '123' },
        ],
      });

      expect(result.success).toBe(true);

      const messages = await mcp.playwright.browser_console_messages();
      expect(messages.data!.some(m => m.text.includes('Card Number'))).toBe(true);
    });
  });
});
