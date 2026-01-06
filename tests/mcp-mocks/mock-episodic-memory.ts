/**
 * Mock Episodic Memory MCP Server
 * 
 * Provides mock implementations of cross-session memory
 * tools for testing without real conversation history.
 */

export interface MockConversation {
  id: string;
  date: string;
  project: string;
  snippets: string[];
  path: string;
  content: string;
}

export class MockEpisodicMemory {
  private conversations: Map<string, MockConversation> = new Map();

  constructor() {
    this.reset();
  }

  reset() {
    this.conversations.clear();
  }

  // Setup methods for tests
  addConversation(conversation: MockConversation) {
    this.conversations.set(conversation.id, conversation);
  }

  // Mock tool implementations
  async search(params: {
    query: string | string[];
    mode?: 'vector' | 'text' | 'both';
    limit?: number;
    before?: string;
    after?: string;
  }): Promise<{ result: string }> {
    const queryTerms = Array.isArray(params.query) ? params.query : [params.query];
    const limit = params.limit || 10;
    
    const matches: Array<{
      id: string;
      project: string;
      date: string;
      snippets: string[];
      score: number;
    }> = [];

    for (const [id, conv] of this.conversations) {
      // Date filtering
      if (params.before && conv.date > params.before) continue;
      if (params.after && conv.date < params.after) continue;

      // Query matching
      const contentLower = conv.content.toLowerCase();
      const queryLower = queryTerms.map(q => q.toLowerCase());
      
      let matchCount = 0;
      for (const term of queryLower) {
        if (contentLower.includes(term)) {
          matchCount++;
        }
      }

      if (matchCount > 0) {
        matches.push({
          id: conv.id,
          project: conv.project,
          date: conv.date,
          snippets: conv.snippets,
          score: matchCount / queryLower.length
        });
      }
    }

    // Sort by score and limit
    matches.sort((a, b) => b.score - a.score);
    const results = matches.slice(0, limit);

    if (results.length === 0) {
      return {
        result: `No conversations found matching: ${queryTerms.join(', ')}`
      };
    }

    return {
      result: JSON.stringify({
        total: results.length,
        results: results.map(r => ({
          id: r.id,
          project: r.project,
          date: r.date,
          snippets: r.snippets,
          relevance: Math.round(r.score * 100) + '%'
        }))
      })
    };
  }

  async read(params: {
    path: string;
    startLine?: number;
    endLine?: number;
  }): Promise<{ result: string }> {
    // Find conversation by path
    for (const [id, conv] of this.conversations) {
      if (conv.path === params.path || conv.id === params.path) {
        let content = conv.content;
        
        if (params.startLine || params.endLine) {
          const lines = content.split('\n');
          const start = (params.startLine || 1) - 1;
          const end = params.endLine || lines.length;
          content = lines.slice(start, end).join('\n');
        }

        return { result: content };
      }
    }

    return {
      result: JSON.stringify({
        error: `Conversation not found: ${params.path}`
      })
    };
  }
}

// Singleton for easy test setup
export const mockEpisodicMemory = new MockEpisodicMemory();
