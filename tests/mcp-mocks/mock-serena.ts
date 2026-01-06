/**
 * Mock Serena MCP Server
 * 
 * Provides mock implementations of Serena tools for testing
 * skills and agents without real MCP connections.
 */

export interface MockFile {
  path: string;
  content: string;
  symbols?: MockSymbol[];
}

export interface MockSymbol {
  name: string;
  kind: 'class' | 'function' | 'method' | 'variable';
  body: string;
  line: number;
}

export interface MockMemory {
  name: string;
  content: string;
}

export class MockSerena {
  private files: Map<string, MockFile> = new Map();
  private memories: Map<string, MockMemory> = new Map();
  private shellOutput: string = '';

  constructor() {
    this.reset();
  }

  reset() {
    this.files.clear();
    this.memories.clear();
    this.shellOutput = '';
  }

  // Setup methods for tests
  addFile(file: MockFile) {
    this.files.set(file.path, file);
  }

  addMemory(memory: MockMemory) {
    this.memories.set(memory.name, memory);
  }

  setShellOutput(output: string) {
    this.shellOutput = output;
  }

  // Mock tool implementations
  async find_symbol(params: {
    name_path_pattern: string;
    relative_path?: string;
    include_body?: boolean;
    depth?: number;
  }): Promise<{ result: string }> {
    const matches: any[] = [];
    
    for (const [path, file] of this.files) {
      if (params.relative_path && !path.includes(params.relative_path)) {
        continue;
      }
      
      for (const symbol of file.symbols || []) {
        if (symbol.name.includes(params.name_path_pattern) || 
            params.name_path_pattern.includes(symbol.name)) {
          matches.push({
            name: symbol.name,
            kind: symbol.kind,
            path: path,
            line: symbol.line,
            body: params.include_body ? symbol.body : undefined
          });
        }
      }
    }
    
    return { result: JSON.stringify(matches) };
  }

  async get_symbols_overview(params: {
    relative_path: string;
    depth?: number;
  }): Promise<{ result: string }> {
    const file = this.files.get(params.relative_path);
    if (!file) {
      return { result: JSON.stringify({ error: 'File not found' }) };
    }
    
    const overview = {
      path: params.relative_path,
      symbols: (file.symbols || []).map(s => ({
        name: s.name,
        kind: s.kind,
        line: s.line
      }))
    };
    
    return { result: JSON.stringify(overview) };
  }

  async search_for_pattern(params: {
    substring_pattern: string;
    relative_path?: string;
    context_lines_before?: number;
    context_lines_after?: number;
  }): Promise<{ result: string }> {
    const matches: any[] = [];
    const regex = new RegExp(params.substring_pattern, 'gi');
    
    for (const [path, file] of this.files) {
      if (params.relative_path && !path.includes(params.relative_path)) {
        continue;
      }
      
      const lines = file.content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (regex.test(lines[i])) {
          matches.push({
            path,
            line: i + 1,
            content: lines[i],
            context_before: lines.slice(Math.max(0, i - (params.context_lines_before || 0)), i),
            context_after: lines.slice(i + 1, i + 1 + (params.context_lines_after || 0))
          });
        }
      }
    }
    
    return { result: JSON.stringify(matches) };
  }

  async read_file(params: {
    relative_path: string;
    start_line?: number;
    end_line?: number;
  }): Promise<{ result: string }> {
    const file = this.files.get(params.relative_path);
    if (!file) {
      return { result: JSON.stringify({ error: 'File not found' }) };
    }
    
    let content = file.content;
    if (params.start_line || params.end_line) {
      const lines = content.split('\n');
      const start = (params.start_line || 1) - 1;
      const end = params.end_line || lines.length;
      content = lines.slice(start, end).join('\n');
    }
    
    return { result: content };
  }

  async create_text_file(params: {
    relative_path: string;
    content: string;
  }): Promise<{ result: string }> {
    this.files.set(params.relative_path, {
      path: params.relative_path,
      content: params.content
    });
    return { result: `File created: ${params.relative_path}` };
  }

  async replace_content(params: {
    relative_path: string;
    needle: string;
    repl: string;
    mode: 'literal' | 'regex';
  }): Promise<{ result: string }> {
    const file = this.files.get(params.relative_path);
    if (!file) {
      return { result: JSON.stringify({ error: 'File not found' }) };
    }
    
    if (params.mode === 'literal') {
      file.content = file.content.replace(params.needle, params.repl);
    } else {
      file.content = file.content.replace(new RegExp(params.needle, 'g'), params.repl);
    }
    
    return { result: 'OK' };
  }

  async write_memory(params: {
    memory_file_name: string;
    content: string;
  }): Promise<{ result: string }> {
    this.memories.set(params.memory_file_name, {
      name: params.memory_file_name,
      content: params.content
    });
    return { result: `Memory ${params.memory_file_name} written.` };
  }

  async read_memory(params: {
    memory_file_name: string;
  }): Promise<{ result: string }> {
    const memory = this.memories.get(params.memory_file_name);
    if (!memory) {
      return { result: JSON.stringify({ error: 'Memory not found' }) };
    }
    return { result: memory.content };
  }

  async list_memories(): Promise<{ result: string }> {
    const names = Array.from(this.memories.keys());
    return { result: JSON.stringify(names) };
  }

  async execute_shell_command(params: {
    command: string;
    cwd?: string;
  }): Promise<{ result: string }> {
    return { result: JSON.stringify({ stdout: this.shellOutput, stderr: '' }) };
  }

  async list_dir(params: {
    relative_path: string;
    recursive?: boolean;
  }): Promise<{ result: string }> {
    const dirs: string[] = [];
    const files: string[] = [];
    
    for (const path of this.files.keys()) {
      if (path.startsWith(params.relative_path) || params.relative_path === '.') {
        files.push(path);
        const dir = path.substring(0, path.lastIndexOf('/'));
        if (dir && !dirs.includes(dir)) {
          dirs.push(dir);
        }
      }
    }
    
    return { result: JSON.stringify({ dirs, files }) };
  }
}

// Singleton for easy test setup
export const mockSerena = new MockSerena();
