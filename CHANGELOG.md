# Changelog

All notable changes to Claude Payment Orchestrator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Module system for domain flexibility (core, payment, security, frontend)
- MCP mock framework for testing
- Templates for agents, skills, and commands
- `/new-agent`, `/new-skill`, `/new-command` scaffolding commands

## [1.1.0] - 2026-01-05

### Added
- 3-tier thinking system: `think-hard`, `think-harder`, `ultrathink`
- `/think` command for intelligent tier routing
- `/debug` command for systematic debugging
- `agent-organizer` meta-orchestrator agent
- `database-specialist` agent for database operations
- `devops-engineer` agent for infrastructure and CI/CD
- `scripts/validate-config.cjs` for configuration validation
- Security deny rules in settings.json
- Expanded allow rules for safe commands

### Changed
- Updated README.md with new counts (18 agents, 49 skills, 13 commands)
- Updated CLAUDE.md with new agent categories
- Enhanced settings.json with security deny rules

### Security
- Added deny rules for dangerous bash commands
- Added validation for plugin configuration

## [1.0.0] - 2026-01-05

### Added
- Initial release
- 15 specialized agents for payment systems development
- 46 domain-specific skills
- 8 slash commands
- 5 workflow hooks (SessionStart, PreCompact, PostCompact, PreToolUse, Stop)
- Session persistence with auto-save/restore
- MCP integration (Serena, Context7, Playwright, Chrome, Episodic Memory)
- PCI DSS compliance patterns
- 4-phase execution workflow

### Agents (Initial)
- `payment-integration` - Payment flow orchestration
- `visa-cybersource-payments` - Visa CyberSource specialist
- `mastercard-mpgs-specialist` - Mastercard MPGS specialist
- `fullstack-developer` - Full-stack development
- `frontend-developer` - React/Next.js specialist
- `nextjs-developer` - Next.js App Router expert
- `api-designer` - API design & implementation
- `api-documenter` - OpenAPI documentation
- `security-auditor` - Security & PCI compliance
- `penetration-tester` - Security testing
- `playwright-testing` - E2E testing specialist
- `shadcn-ui-architect` - UI component design
- `sequential-reasoner` - Step-by-step flow validation
- `memory-context-manager` - Session state management
- `agent-mcp-discovery` - MCP tool discovery

### Skills (Initial)
- Payment: payment-orchestration, scaffold-payment-form, tokenize-card-data, etc.
- Security: security-compliance, verify-pci-scope, audit-access-logs, etc.
- Frontend: frontend-development, validate-card-input-ui, etc.
- API: api-development, handle-webhook-event, etc.
- Testing: testing, mock-psp-response, etc.

### Commands (Initial)
- `/workflow` - Master workflow
- `/payment` - Payment integration
- `/security` - Security & compliance
- `/frontend` - Frontend development
- `/api` - API development
- `/testing` - Testing workflow
- `/saveContext` - Save session state
- `/restoreContext` - Restore session state

[Unreleased]: https://github.com/YOUSSEFELJAYAD/mcp-config-master/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/YOUSSEFELJAYAD/mcp-config-master/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/YOUSSEFELJAYAD/mcp-config-master/releases/tag/v1.0.0
