/**
 * Mock Context7 MCP Server
 * 
 * Provides mock implementations of Context7 tools for testing
 * without requiring real documentation lookup.
 */

export interface MockLibrary {
  id: string;
  name: string;
  description: string;
  docs: Map<string, string>;
}

export class MockContext7 {
  private libraries: Map<string, MockLibrary> = new Map();

  constructor() {
    this.reset();
    this.setupDefaultLibraries();
  }

  reset() {
    this.libraries.clear();
  }

  private setupDefaultLibraries() {
    // Add common libraries for testing
    this.addLibrary({
      id: '/stripe/stripe-node',
      name: 'stripe',
      description: 'Stripe Node.js SDK',
      docs: new Map([
        ['payment intents', 'PaymentIntents API: Create, confirm, and manage payment intents...'],
        ['webhooks', 'Webhook handling: Verify signatures, handle events...'],
        ['customers', 'Customer API: Create and manage customer records...']
      ])
    });

    this.addLibrary({
      id: '/facebook/react',
      name: 'react',
      description: 'React JavaScript library',
      docs: new Map([
        ['hooks', 'React Hooks: useState, useEffect, useContext...'],
        ['components', 'Component patterns: functional, class, HOC...'],
        ['forms', 'Form handling: controlled, uncontrolled, validation...']
      ])
    });

    this.addLibrary({
      id: '/vercel/next.js',
      name: 'next.js',
      description: 'Next.js React Framework',
      docs: new Map([
        ['app router', 'App Router: layouts, pages, loading, error handling...'],
        ['server components', 'Server Components: RSC, streaming, suspense...'],
        ['api routes', 'API Routes: route handlers, middleware...']
      ])
    });

    this.addLibrary({
      id: '/prisma/prisma',
      name: 'prisma',
      description: 'Prisma ORM',
      docs: new Map([
        ['schema', 'Prisma Schema: models, relations, indexes...'],
        ['client', 'Prisma Client: queries, transactions, raw SQL...'],
        ['migrations', 'Migrations: create, apply, rollback...']
      ])
    });
  }

  // Setup methods for tests
  addLibrary(library: MockLibrary) {
    this.libraries.set(library.id, library);
    // Also index by name for resolve
    this.libraries.set(library.name.toLowerCase(), library);
  }

  addDocs(libraryId: string, topic: string, content: string) {
    const library = this.libraries.get(libraryId);
    if (library) {
      library.docs.set(topic.toLowerCase(), content);
    }
  }

  // Mock tool implementations
  async resolve_library_id(params: {
    libraryName: string;
    query?: string;
  }): Promise<{ result: string }> {
    const searchName = params.libraryName.toLowerCase();
    
    // Direct match
    for (const [id, library] of this.libraries) {
      if (library.name.toLowerCase() === searchName || 
          library.id.toLowerCase().includes(searchName)) {
        return {
          result: JSON.stringify({
            id: library.id,
            name: library.name,
            description: library.description,
            confidence: 1.0
          })
        };
      }
    }

    // Fuzzy match
    for (const [id, library] of this.libraries) {
      if (library.name.toLowerCase().includes(searchName) ||
          library.description.toLowerCase().includes(searchName)) {
        return {
          result: JSON.stringify({
            id: library.id,
            name: library.name,
            description: library.description,
            confidence: 0.8
          })
        };
      }
    }

    return {
      result: JSON.stringify({
        error: `Library not found: ${params.libraryName}`,
        suggestions: Array.from(this.libraries.values())
          .filter(l => l.id.startsWith('/'))
          .slice(0, 5)
          .map(l => l.name)
      })
    };
  }

  async query_docs(params: {
    libraryId: string;
    query: string;
  }): Promise<{ result: string }> {
    const library = this.libraries.get(params.libraryId);
    
    if (!library) {
      return {
        result: JSON.stringify({
          error: `Library not found: ${params.libraryId}`
        })
      };
    }

    const queryLower = params.query.toLowerCase();
    
    // Search for matching documentation
    for (const [topic, content] of library.docs) {
      if (topic.includes(queryLower) || queryLower.includes(topic)) {
        return {
          result: JSON.stringify({
            library: library.name,
            topic: topic,
            content: content,
            source: `https://docs.example.com/${library.name}/${topic}`
          })
        };
      }
    }

    // Return general docs if no specific match
    const firstDoc = library.docs.entries().next().value;
    if (firstDoc) {
      return {
        result: JSON.stringify({
          library: library.name,
          topic: firstDoc[0],
          content: firstDoc[1],
          note: `No exact match for "${params.query}", showing related docs`
        })
      };
    }

    return {
      result: JSON.stringify({
        error: `No documentation found for query: ${params.query}`,
        library: library.name
      })
    };
  }
}

// Singleton for easy test setup
export const mockContext7 = new MockContext7();
