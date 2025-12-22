# Skill: Enforce Claude Rules

**Role:** sequential-reasoner (Project Manager)
**Domain:** Agentic & Integrations
**Objective:** Ensure the AI agent reads and adheres to project-specific constraints defined in CLAUDE.md before initiating any task, using file analysis and verification.

## Available Capabilities

| Category | Capability | Rules Enforcement Use Case |
|----------|-----------|---------------------------|
| **MCP Servers** | | |
| Serena | File Reading | Read CLAUDE.md, verify rule compliance |
| Context7 | Documentation | Get best practices for project rules |
| Episodic Memory | Rule History | Recall past rule violations, corrections |
| **Superpowers** | | |
| verification-before-completion | Verify Compliance | Check rules before executing tasks |

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   RULES ENFORCEMENT WORKFLOW                             │
├─────────────────────────────────────────────────────────────────────────┤
│  1. DETECTION     → Check for CLAUDE.md in root/.github/               │
│  2. INGESTION     → Read file into context (Serena)                     │
│  3. PARSING       → Extract constraints, style guides, requirements     │
│  4. VALIDATION    → Check user request against rules                    │
│  5. COMPLIANCE    → Follow rules or ask for clarification               │
│  6. EXECUTION     → Execute task within constraints                     │
│  7. VERIFICATION  → Verify output follows rules                         │
│  8. MEMORY        → Episodic: Store rule adherence patterns             │
└─────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

```typescript
// Read and parse CLAUDE.md
async function enforceProjectRules() {
  // 1. Check for CLAUDE.md
  const claudeMdPaths = [
    "CLAUDE.md",
    ".github/CLAUDE.md",
    ".claude/CLAUDE.md",
    "docs/CLAUDE.md"
  ];

  let rulesContent = null;

  for (const path of claudeMdPaths) {
    try {
      rulesContent = await mcp_serena.read_file({
        relative_path: path
      });
      console.log(`Found project rules at: ${path}`);
      break;
    } catch (e) {
      // File doesn't exist, try next path
    }
  }

  if (!rulesContent) {
    console.log("No CLAUDE.md found - using default behavior");
    return null;
  }

  // 2. Parse rules
  const rules = parseRules(rulesContent);

  // 3. Store in memory for session
  await mcp_serena.write_memory({
    memory_file_name: "project-rules.md",
    content: rulesContent
  });

  return rules;
}

// Check if action complies with rules
function checkCompliance(action: string, rules: ProjectRules): boolean {
  // Check negative constraints
  for (const constraint of rules.negativeConstraints) {
    if (action.includes(constraint)) {
      console.warn(`Action violates rule: ${constraint}`);
      return false;
    }
  }

  // Check positive requirements
  for (const requirement of rules.requirements) {
    if (!action.includes(requirement)) {
      console.warn(`Action missing requirement: ${requirement}`);
      return false;
    }
  }

  return true;
}
```

## Example CLAUDE.md Structure

```markdown
# CLAUDE.md

## Negative Constraints (DON'T)
- Never use `cd` command (use absolute paths)
- Never commit without explicit user request
- Never push to main branch without approval
- No semicolons in TypeScript code

## Style Guides
- Use TypeScript strict mode
- Use bun as package manager (not npm)
- Use Tailwind CSS for styling
- Use Shadcn UI components

## Build & Run
- Run: `bun run dev`
- Build: `bun run build`
- Test: `bun test`

## Architecture
- Next.js 14+ App Router
- React Server Components
- Zustand for state
- Prisma for database
```

## MCP Integration Examples

### Serena: Read Project Rules

```typescript
// Read CLAUDE.md
const rules = await mcp_serena.read_file({
  relative_path: "CLAUDE.md"
});

// Parse sections
const sections = {
  negativeConstraints: extractSection(rules, "Negative Constraints"),
  styleGuide: extractSection(rules, "Style Guides"),
  buildCommands: extractSection(rules, "Build & Run"),
  architecture: extractSection(rules, "Architecture")
};

// Store parsed rules
await mcp_serena.write_memory({
  memory_file_name: "parsed-project-rules.json",
  content: JSON.stringify(sections, null, 2)
});
```

### Episodic Memory: Rule Violations

```typescript
// Check for past rule violations
const violations = await mcp_episodic_memory.search({
  query: ["violated rule", "CLAUDE.md constraint", "project guideline"],
  mode: "both",
  limit: 10
});

// Learn from corrections
const corrections = await mcp_episodic_memory.search({
  query: "corrected to follow CLAUDE.md",
  mode: "text",
  limit: 5
});
```

## Best Practices

### Rule Structure

```markdown
## Negative Constraints (DON'T)
- Clear, actionable prohibitions
- Example: "Never use `cd`", not "Avoid changing directories"

## Positive Requirements (DO)
- Explicit requirements
- Example: "Always use TypeScript strict mode"

## Style Guides
- Code formatting preferences
- Library/framework choices

## Commands
- Exact commands to run
- Build, test, deploy procedures
```

### Compliance Checking

```typescript
// Before executing command, check rules
const action = "cd src && npm install";

const rules = {
  negativeConstraints: ["cd", "npm"],
  requirements: ["bun"]
};

if (action.includes("cd")) {
  console.error("Violates rule: Never use cd");
  // Fix: "bun install" from current directory
}

if (action.includes("npm")) {
  console.error("Violates rule: Use bun, not npm");
  // Fix: Replace "npm" with "bun"
}
```

### Clarification Requests

```typescript
// When rule conflicts with user request
const userRequest = "Push to main branch";
const rule = "Never push to main without approval";

// Ask for clarification
console.log(`
Your request: "${userRequest}"
Project rule: "${rule}"

Do you want to override this rule? (yes/no)
`);
```

### Documentation

```typescript
await mcp_serena.write_memory({
  memory_file_name: "rules-compliance-log.md",
  content: `
# Rules Compliance Log

## 2024-12-18 14:32
- **Request:** npm install
- **Rule Violation:** Use bun, not npm
- **Corrected To:** bun install
- **Result:** Success

## 2024-12-18 14:45
- **Request:** cd src && build
- **Rule Violation:** Never use cd
- **Corrected To:** bun run build (absolute paths)
- **Result:** Success
  `
});
```
