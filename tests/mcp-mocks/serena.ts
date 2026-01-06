/**
 * Mock Serena MCP Server
 *
 * Provides mock implementations for semantic code analysis tools.
 */

import type { SerenaMockConfig, SymbolInfo, MockResponse } from './types';

export class MockSerena {
  private files: Record<string, string> = {};
  private symbols: Record<string, SymbolInfo[]> = {};
  private memories: Record<string, string> = {};

  constructor(config: SerenaMockConfig = {}) {
    this.files = config.files || {};
    this.symbols = config.symbols || {};
    this.memories = config.memories || {};
  }

  // File operations
  async read_file(params: { relative_path: string }): Promise<MockResponse<string>> {
    const content = this.files[params.relative_path];
    if (content === undefined) {
      return { success: false, error: `File not found: ${params.relative_path}` };
    }
    return { success: true, data: content };
  }

  async create_text_file(params: {
    relative_path: string;
    content: string;
  }): Promise<MockResponse<void>> {
    this.files[params.relative_path] = params.content;
    return { success: true };
  }

  async list_dir(params: {
    relative_path: string;
    recursive?: boolean;
  }): Promise<MockResponse<{ files: string[]; directories: string[] }>> {
    const prefix = params.relative_path === '.' ? '' : params.relative_path + '/';
    const allPaths = Object.keys(this.files);

    const files: string[] = [];
    const directories = new Set<string>();

    for (const path of allPaths) {
      if (path.startsWith(prefix)) {
        const relativePath = path.slice(prefix.length);
        const parts = relativePath.split('/');

        if (parts.length === 1) {
          files.push(parts[0]);
        } else if (params.recursive) {
          files.push(relativePath);
          directories.add(parts[0]);
        } else {
          directories.add(parts[0]);
        }
      }
    }

    return {
      success: true,
      data: { files, directories: Array.from(directories) },
    };
  }

  // Symbol operations
  async find_symbol(params: {
    name_path_pattern: string;
    relative_path?: string;
    include_body?: boolean;
  }): Promise<MockResponse<SymbolInfo[]>> {
    const allSymbols: SymbolInfo[] = [];

    for (const [file, symbols] of Object.entries(this.symbols)) {
      if (params.relative_path && !file.startsWith(params.relative_path)) {
        continue;
      }

      for (const symbol of symbols) {
        if (this.matchesPattern(symbol.name, params.name_path_pattern)) {
          allSymbols.push({
            ...symbol,
            body: params.include_body ? symbol.body : undefined,
          });
        }
      }
    }

    return { success: true, data: allSymbols };
  }

  async get_symbols_overview(params: {
    relative_path: string;
    depth?: number;
  }): Promise<MockResponse<{ symbols: SymbolInfo[] }>> {
    const symbols = this.symbols[params.relative_path] || [];
    return { success: true, data: { symbols } };
  }

  async replace_symbol_body(params: {
    name_path: string;
    relative_path: string;
    body: string;
  }): Promise<MockResponse<void>> {
    const fileSymbols = this.symbols[params.relative_path];
    if (!fileSymbols) {
      return { success: false, error: 'File not found' };
    }

    const symbol = fileSymbols.find(s => s.name === params.name_path);
    if (!symbol) {
      return { success: false, error: 'Symbol not found' };
    }

    symbol.body = params.body;
    return { success: true };
  }

  // Search operations
  async search_for_pattern(params: {
    substring_pattern: string;
    relative_path?: string;
  }): Promise<MockResponse<{ matches: Array<{ file: string; line: number; content: string }> }>> {
    const matches: Array<{ file: string; line: number; content: string }> = [];
    const regex = new RegExp(params.substring_pattern);

    for (const [file, content] of Object.entries(this.files)) {
      if (params.relative_path && !file.startsWith(params.relative_path)) {
        continue;
      }

      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (regex.test(lines[i])) {
          matches.push({ file, line: i + 1, content: lines[i] });
        }
      }
    }

    return { success: true, data: { matches } };
  }

  // Memory operations
  async write_memory(params: {
    memory_file_name: string;
    content: string;
  }): Promise<MockResponse<void>> {
    this.memories[params.memory_file_name] = params.content;
    return { success: true };
  }

  async read_memory(params: {
    memory_file_name: string;
  }): Promise<MockResponse<string>> {
    const content = this.memories[params.memory_file_name];
    if (content === undefined) {
      return { success: false, error: 'Memory not found' };
    }
    return { success: true, data: content };
  }

  async list_memories(): Promise<MockResponse<string[]>> {
    return { success: true, data: Object.keys(this.memories) };
  }

  // Helper methods
  private matchesPattern(name: string, pattern: string): boolean {
    if (pattern.startsWith('/')) {
      return name === pattern.slice(1);
    }
    return name.includes(pattern) || name.endsWith(pattern);
  }

  // Test utilities
  addFile(path: string, content: string): void {
    this.files[path] = content;
  }

  addSymbol(file: string, symbol: SymbolInfo): void {
    if (!this.symbols[file]) {
      this.symbols[file] = [];
    }
    this.symbols[file].push(symbol);
  }

  reset(): void {
    this.files = {};
    this.symbols = {};
    this.memories = {};
  }
}
