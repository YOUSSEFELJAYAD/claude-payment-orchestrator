/**
 * Mock Context7 MCP Server
 *
 * Provides mock implementations for library documentation lookup.
 */

import type { Context7MockConfig, LibraryInfo, MockResponse } from './types';

export class MockContext7 {
  private libraries: Record<string, LibraryInfo> = {};
  private docs: Record<string, string> = {};

  constructor(config: Context7MockConfig = {}) {
    this.libraries = config.libraries || this.getDefaultLibraries();
    this.docs = config.docs || this.getDefaultDocs();
  }

  async resolve_library_id(params: {
    libraryName: string;
    query?: string;
  }): Promise<MockResponse<LibraryInfo[]>> {
    const matches: LibraryInfo[] = [];
    const searchTerm = params.libraryName.toLowerCase();

    for (const library of Object.values(this.libraries)) {
      if (
        library.name.toLowerCase().includes(searchTerm) ||
        library.id.toLowerCase().includes(searchTerm)
      ) {
        matches.push(library);
      }
    }

    if (matches.length === 0) {
      return { success: false, error: `No library found for: ${params.libraryName}` };
    }

    return { success: true, data: matches };
  }

  async query_docs(params: {
    libraryId: string;
    query: string;
  }): Promise<MockResponse<string>> {
    const docKey = `${params.libraryId}:${params.query}`;
    let doc = this.docs[docKey];

    // Fallback to library-level docs
    if (!doc) {
      doc = this.docs[params.libraryId];
    }

    if (!doc) {
      return {
        success: true,
        data: `Documentation for ${params.libraryId} - ${params.query}\n\nNo specific documentation found. Please refer to the official documentation.`,
      };
    }

    return { success: true, data: doc };
  }

  // Default libraries for testing
  private getDefaultLibraries(): Record<string, LibraryInfo> {
    return {
      stripe: {
        id: '/stripe/stripe-node',
        name: 'stripe',
        version: '14.0.0',
        description: 'Stripe API Node.js client',
      },
      adyen: {
        id: '/adyen/adyen-node-api-library',
        name: '@adyen/api-library',
        version: '14.0.0',
        description: 'Adyen API Node.js client',
      },
      square: {
        id: '/square/square-nodejs-sdk',
        name: 'square',
        version: '35.0.0',
        description: 'Square API Node.js client',
      },
      paypal: {
        id: '/paypal/paypal-rest-sdk',
        name: '@paypal/checkout-server-sdk',
        version: '1.0.3',
        description: 'PayPal Checkout SDK',
      },
      react: {
        id: '/facebook/react',
        name: 'react',
        version: '18.2.0',
        description: 'React JavaScript library',
      },
      nextjs: {
        id: '/vercel/next.js',
        name: 'next',
        version: '14.0.0',
        description: 'Next.js React framework',
      },
    };
  }

  // Default documentation snippets
  private getDefaultDocs(): Record<string, string> {
    return {
      '/stripe/stripe-node': `
# Stripe Node.js Library

## Installation
\`\`\`bash
npm install stripe
\`\`\`

## Quick Start
\`\`\`typescript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a PaymentIntent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 1000,
  currency: 'usd',
});
\`\`\`
      `,
      '/stripe/stripe-node:payment intents': `
# Payment Intents API

## Create a Payment Intent
\`\`\`typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 1000,
  currency: 'usd',
  automatic_payment_methods: { enabled: true },
});
\`\`\`

## Confirm Payment
\`\`\`typescript
const confirmedIntent = await stripe.paymentIntents.confirm(
  paymentIntent.id,
  { payment_method: 'pm_card_visa' }
);
\`\`\`
      `,
      '/adyen/adyen-node-api-library': `
# Adyen Node.js Library

## Installation
\`\`\`bash
npm install @adyen/api-library
\`\`\`

## Quick Start
\`\`\`typescript
import { Client, CheckoutAPI } from '@adyen/api-library';

const client = new Client({
  apiKey: process.env.ADYEN_API_KEY,
  environment: 'TEST',
});

const checkout = new CheckoutAPI(client);
\`\`\`
      `,
    };
  }

  // Test utilities
  addLibrary(library: LibraryInfo): void {
    this.libraries[library.name] = library;
  }

  addDocs(key: string, content: string): void {
    this.docs[key] = content;
  }

  reset(): void {
    this.libraries = this.getDefaultLibraries();
    this.docs = this.getDefaultDocs();
  }
}
