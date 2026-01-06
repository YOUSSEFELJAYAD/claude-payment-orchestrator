/**
 * Types for MCP Mock Framework
 */

export interface MCPMockConfig {
  serena?: SerenaMockConfig;
  context7?: Context7MockConfig;
  playwright?: PlaywrightMockConfig;
  episodicMemory?: EpisodicMemoryMockConfig;
}

export interface MockResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SerenaMockConfig {
  files?: Record<string, string>;
  symbols?: Record<string, SymbolInfo[]>;
  memories?: Record<string, string>;
}

export interface SymbolInfo {
  name: string;
  kind: 'class' | 'function' | 'method' | 'variable' | 'interface';
  location: {
    file: string;
    line: number;
    column: number;
  };
  body?: string;
}

export interface Context7MockConfig {
  libraries?: Record<string, LibraryInfo>;
  docs?: Record<string, string>;
}

export interface LibraryInfo {
  id: string;
  name: string;
  version: string;
  description: string;
}

export interface PlaywrightMockConfig {
  pages?: Record<string, PageSnapshot>;
  responses?: Record<string, any>;
}

export interface PageSnapshot {
  url: string;
  title: string;
  content: string;
  elements?: ElementInfo[];
}

export interface ElementInfo {
  ref: string;
  type: string;
  text?: string;
  attributes?: Record<string, string>;
}

export interface EpisodicMemoryMockConfig {
  conversations?: ConversationRecord[];
}

export interface ConversationRecord {
  id: string;
  date: string;
  project: string;
  content: string;
  snippets: string[];
}
