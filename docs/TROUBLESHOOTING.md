# Troubleshooting Guide

## Quick Diagnosis

```
Problem Category          → Go To Section
─────────────────────────────────────────
Installation issues       → Section 1
Agent not working         → Section 2
Skill not activating      → Section 3
MCP connection errors     → Section 4
Command failures          → Section 5
Thinking tiers not working→ Section 6
Performance issues        → Section 7
Security warnings         → Section 8
```

---

## 1. Installation Issues

### Plugin not recognized

**Symptom:** Claude Code doesn't see the plugin.

**Solutions:**
```bash
# 1. Verify plugin location
ls -la ~/.claude/plugins/

# 2. Check plugin.json exists
cat ~/.claude/plugins/payment-orchestrator/plugin.json

# 3. Validate structure
cd ~/.claude/plugins/payment-orchestrator
npm run validate

# 4. Restart Claude Code
claude --restart
```

### Validation errors

**Symptom:** `npm run validate` fails.

**Common fixes:**
```bash
# Missing dependencies
npm install

# Permission issues
chmod -R 755 master/

# Invalid JSON
node -e "require('./plugin.json')"  # Check for parse errors
```

### Node version incompatibility

**Symptom:** Syntax errors or module issues.

**Solution:**
```bash
# Check version (requires 18+)
node --version

# Use nvm to switch
nvm use 18
```

---

## 2. Agent Issues

### Agent not responding

**Symptom:** Agent mentioned but not activated.

**Check:**
```bash
# Verify agent exists
ls master/agents/ | grep "agent-name"

# Check agent frontmatter
head -20 master/agents/agent-name.md
```

**Common causes:**
1. Agent name misspelled
2. Agent file missing `.md` extension
3. Invalid YAML frontmatter

### Wrong agent selected

**Symptom:** Different agent handles the task.

**Solution:**
Be more specific in your request:
```
# Vague (might select wrong agent)
User: Help with payments

# Specific (correct agent selected)
User: Use the visa-cybersource-payments agent to integrate CyberSource
```

### Agent tools not working

**Symptom:** Agent can't use its tools.

**Check agent configuration:**
```yaml
# In agent file, verify tools list
tools: [Read, Write, Edit, Bash, Glob, Grep, Task, WebFetch, WebSearch]
```

**Verify MCP server is running:**
```bash
# Check Serena
curl http://localhost:8080/health

# Check if MCP is configured
cat ~/.claude/mcp.json
```

---

## 3. Skill Activation Issues

### Skill not triggering

**Symptom:** Skill should activate but doesn't.

**Debug steps:**
```bash
# 1. Check skill exists
ls master/skills/skill-name/SKILL.md

# 2. Verify activation pattern in frontmatter
head -10 master/skills/skill-name/SKILL.md
```

**Solution:** Include activation keywords in your prompt:
```
# Won't trigger payment-orchestration
User: Build something

# Will trigger
User: Design a payment orchestration flow for multi-PSP routing
```

### Skill produces errors

**Symptom:** Skill runs but fails.

**Common causes:**

1. **Missing dependencies**
   - Check if skill requires specific MCP server
   - Verify related skills exist

2. **Outdated patterns**
   - Skill may reference old API
   - Check Context7 for current docs

3. **Context mismatch**
   - Skill expects certain files to exist
   - Verify project structure matches expectations

### Multiple skills conflict

**Symptom:** Two skills try to handle same task.

**Solution:** Be explicit:
```
User: Use ONLY the psp-integration skill (not payment-orchestration) to...
```

---

## 4. MCP Connection Errors

### Serena not connecting

**Symptom:** `Error: Cannot connect to Serena server`

**Solutions:**
```bash
# 1. Start Serena manually
serena start

# 2. Check port availability
lsof -i :8080

# 3. Verify configuration
cat ~/.claude/mcp.json | grep serena

# 4. Check logs
tail -f ~/.serena/logs/server.log
```

### Context7 failures

**Symptom:** `Error: Library not found` or timeout.

**Solutions:**
```bash
# 1. Check internet connection
curl https://api.context7.dev/health

# 2. Verify API key (if required)
echo $CONTEXT7_API_KEY

# 3. Try manual lookup
context7 resolve "stripe"
```

### Playwright browser issues

**Symptom:** Browser doesn't launch.

**Solutions:**
```bash
# 1. Install browsers
npx playwright install

# 2. Check dependencies (Linux)
npx playwright install-deps

# 3. Run in headed mode for debugging
PLAYWRIGHT_HEADLESS=false claude
```

### Chrome MCP issues

**Symptom:** `use_browser` fails.

**Solutions:**
```bash
# 1. Ensure Chrome is running
pgrep -f "Google Chrome"

# 2. Enable remote debugging
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# 3. Check connection
curl http://localhost:9222/json
```

---

## 5. Command Failures

### Command not found

**Symptom:** `/command-name` not recognized.

**Check:**
```bash
# List available commands
ls master/commands/

# Verify command file
cat master/commands/command-name.md
```

### Command arguments not parsed

**Symptom:** Arguments ignored or misinterpreted.

**Solution:** Check argument syntax in command file:
```yaml
arguments:
  - name: target
    description: "The target to process"
    required: true
```

Use correct format:
```
/command target_value
/command --target=target_value
```

### Command timeout

**Symptom:** Command hangs or times out.

**Solutions:**
1. Check if command triggers long-running process
2. Use background execution: `run_in_background: true`
3. Increase timeout in Bash tool

---

## 6. Thinking Tier Issues

### Thinking tier not activating

**Symptom:** Says "think hard" but normal response.

**Solutions:**

1. **Use exact phrases:**
   ```
   ✓ "think hard about..."
   ✓ "think harder about..."
   ✓ "ultrathink about..."

   ✗ "think really hard"
   ✗ "think very carefully"
   ```

2. **Check skill files exist:**
   ```bash
   ls master/skills/think-hard/
   ls master/skills/think-harder/
   ls master/skills/ultrathink/
   ```

### Agents not deploying in thinking tier

**Symptom:** Tier activates but agents don't run.

**Check:**
- Tier 1 uses single Explore agent
- Tier 2 uses 3+ parallel agents
- Tier 3 uses 6+ agent swarm

**Verify agent definitions:**
```bash
cat master/agents/Explore.md
```

### Memory not being searched

**Symptom:** Past context not recalled.

**Check Episodic Memory MCP:**
```bash
# Verify configuration
cat ~/.claude/mcp.json | grep episodic

# Test search
mcp episodic-memory search "payment"
```

---

## 7. Performance Issues

### Slow response times

**Causes & Solutions:**

1. **Too many MCP calls**
   - Use caching when available
   - Batch similar requests

2. **Large file reads**
   - Use Glob/Grep to narrow scope
   - Read specific line ranges

3. **Agent overhead**
   - Use direct skills for simple tasks
   - Agents add coordination cost

### Memory usage high

**Solutions:**
```bash
# Clear Claude Code cache
rm -rf ~/.claude/cache/*

# Manage checkpoints
/checkpoint list
/checkpoint delete old-checkpoint-id

# Compact session context
/compact
```

### Context window exhaustion

**Symptom:** `Context limit reached`

**Solutions:**
1. Use `/compact` to summarize
2. Split into multiple sessions
3. Save context before clearing

---

## 8. Security Warnings

### PCI compliance warnings

**Symptom:** Hook blocks operation with PCI warning.

**Common issues:**
- Logging cardholder data
- Storing CVV/PIN
- Unencrypted PAN transmission

**Fix:** Follow PCI patterns in relevant skills.

### Command injection warning

**Symptom:** Hook blocks with injection warning.

**Issue:** Using string interpolation in shell commands.

**Fix:** Use `execFileNoThrow` instead of template strings:
```typescript
// Bad
await runCommand(`git checkout ${branch}`);

// Good
await execFileNoThrow('git', ['checkout', branch]);
```

### Secret exposure warning

**Symptom:** Detected potential secret in code.

**Fix:**
1. Move secrets to environment variables
2. Use `.env` files (gitignored)
3. Never hardcode API keys

---

## 9. Error Messages Reference

| Error | Cause | Solution |
|-------|-------|----------|
| `ENOENT: no such file` | File path incorrect | Check path exists |
| `EACCES: permission denied` | Insufficient permissions | `chmod` the file |
| `ETIMEDOUT` | Network timeout | Check connection, retry |
| `SyntaxError: Unexpected token` | Invalid JSON/YAML | Validate file syntax |
| `ReferenceError: X is not defined` | Missing import | Check dependencies |
| `CircuitOpenError` | Service unavailable | Wait for circuit reset |

---

## 10. Getting More Help

### Debug mode

Enable verbose logging:
```bash
DEBUG=* claude
```

### Log locations

```
~/.claude/logs/           # Claude Code logs
~/.serena/logs/           # Serena MCP logs
./node_modules/.cache/    # Build cache
```

### Report an issue

Include:
1. Error message (full stack trace)
2. Steps to reproduce
3. Expected behavior
4. Environment (OS, Node version)
5. Plugin version

Submit at: https://github.com/YOUSSEFELJAYAD/mcp-config-master/issues
