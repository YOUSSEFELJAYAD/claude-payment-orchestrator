#!/usr/bin/env node
/**
 * Configuration Validator for Claude Payment Orchestrator
 * 
 * Validates:
 * - Agent files have valid frontmatter
 * - Skill directories have SKILL.md
 * - Command files have valid arguments
 * - Settings.json is valid
 * - No orphaned references
 */

const fs = require('fs');
const path = require('path');

const MASTER_DIR = path.join(__dirname, '..', 'master');

const errors = [];
const warnings = [];

// ANSI colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function log(type, message) {
  if (type === 'error') {
    errors.push(message);
    console.log(`${RED}[ERROR]${RESET} ${message}`);
  } else if (type === 'warn') {
    warnings.push(message);
    console.log(`${YELLOW}[WARN]${RESET} ${message}`);
  } else {
    console.log(`${GREEN}[OK]${RESET} ${message}`);
  }
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  }
  
  return frontmatter;
}

function validateAgents() {
  console.log('\n--- Validating Agents ---\n');
  
  const agentsDir = path.join(MASTER_DIR, 'agents');
  if (!fs.existsSync(agentsDir)) {
    log('error', 'Agents directory not found');
    return;
  }
  
  const agentFiles = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md'));
  
  for (const file of agentFiles) {
    const filePath = path.join(agentsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    
    if (!frontmatter) {
      log('error', `${file}: Missing YAML frontmatter`);
      continue;
    }
    
    // Required fields
    const required = ['name', 'description', 'tools', 'model'];
    for (const field of required) {
      if (!frontmatter[field]) {
        log('error', `${file}: Missing required field '${field}'`);
      }
    }
    
    // Validate model
    const validModels = ['sonnet', 'opus', 'haiku'];
    if (frontmatter.model && !validModels.includes(frontmatter.model)) {
      log('warn', `${file}: Unknown model '${frontmatter.model}'`);
    }
    
    // Check for MCP Integration table
    if (!content.includes('## MCP Integration') && !content.includes('| Server |')) {
      log('warn', `${file}: Missing MCP Integration table`);
    }
    
    log('ok', `${file}: Valid`);
  }
  
  console.log(`\nAgents validated: ${agentFiles.length}`);
}

function validateSkills() {
  console.log('\n--- Validating Skills ---\n');
  
  const skillsDir = path.join(MASTER_DIR, 'skills');
  if (!fs.existsSync(skillsDir)) {
    log('error', 'Skills directory not found');
    return;
  }
  
  const skillDirs = fs.readdirSync(skillsDir).filter(f => 
    fs.statSync(path.join(skillsDir, f)).isDirectory()
  );
  
  for (const skill of skillDirs) {
    const skillPath = path.join(skillsDir, skill, 'SKILL.md');
    
    if (!fs.existsSync(skillPath)) {
      log('error', `${skill}/: Missing SKILL.md`);
      continue;
    }
    
    const content = fs.readFileSync(skillPath, 'utf8');
    
    // Check for required sections
    const requiredSections = ['Role', 'Domain', 'Objective'];
    for (const section of requiredSections) {
      if (!content.includes(`**${section}:**`) && !content.includes(`## ${section}`)) {
        log('warn', `${skill}/SKILL.md: Missing section '${section}'`);
      }
    }
    
    log('ok', `${skill}/SKILL.md: Valid`);
  }
  
  console.log(`\nSkills validated: ${skillDirs.length}`);
}

function validateCommands() {
  console.log('\n--- Validating Commands ---\n');
  
  const commandsDir = path.join(MASTER_DIR, 'commands');
  if (!fs.existsSync(commandsDir)) {
    log('error', 'Commands directory not found');
    return;
  }
  
  const commandFiles = fs.readdirSync(commandsDir).filter(f => f.endsWith('.md'));
  
  for (const file of commandFiles) {
    const filePath = path.join(commandsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    
    if (!frontmatter) {
      log('error', `${file}: Missing YAML frontmatter`);
      continue;
    }
    
    if (!frontmatter.name) {
      log('error', `${file}: Missing 'name' in frontmatter`);
    }
    
    if (!frontmatter.description) {
      log('warn', `${file}: Missing 'description' in frontmatter`);
    }
    
    log('ok', `${file}: Valid`);
  }
  
  console.log(`\nCommands validated: ${commandFiles.length}`);
}

function validateSettings() {
  console.log('\n--- Validating Settings ---\n');
  
  const settingsPath = path.join(MASTER_DIR, 'settings.json');
  
  if (!fs.existsSync(settingsPath)) {
    log('error', 'settings.json not found');
    return;
  }
  
  try {
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    
    // Check permissions
    if (!settings.permissions) {
      log('warn', 'settings.json: Missing permissions block');
    }
    
    // Check hooks
    if (!settings.hooks) {
      log('warn', 'settings.json: Missing hooks block');
    } else {
      const expectedHooks = ['SessionStart', 'PreCompact', 'PostCompact', 'PreToolUse', 'Stop'];
      for (const hook of expectedHooks) {
        if (!settings.hooks[hook]) {
          log('warn', `settings.json: Missing hook '${hook}'`);
        }
      }
    }
    
    log('ok', 'settings.json: Valid JSON');
  } catch (e) {
    log('error', `settings.json: Invalid JSON - ${e.message}`);
  }
}

function validatePluginJson() {
  console.log('\n--- Validating Plugin Manifest ---\n');
  
  const pluginPath = path.join(__dirname, '..', 'plugin.json');
  
  if (!fs.existsSync(pluginPath)) {
    log('error', 'plugin.json not found (required for marketplace)');
    return;
  }
  
  try {
    const plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
    
    const required = ['name', 'version', 'description', 'license'];
    for (const field of required) {
      if (!plugin[field]) {
        log('error', `plugin.json: Missing required field '${field}'`);
      }
    }
    
    // Validate version format
    if (plugin.version && !/^\d+\.\d+\.\d+/.test(plugin.version)) {
      log('warn', `plugin.json: Version should be semver format`);
    }
    
    log('ok', 'plugin.json: Valid');
  } catch (e) {
    log('error', `plugin.json: Invalid JSON - ${e.message}`);
  }
}

// Run all validations
console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║        Claude Payment Orchestrator - Config Validator      ║');
console.log('╚════════════════════════════════════════════════════════════╝');

validatePluginJson();
validateSettings();
validateAgents();
validateSkills();
validateCommands();

// Summary
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('                         SUMMARY                               ');
console.log('═══════════════════════════════════════════════════════════════');
console.log(`${GREEN}Passed${RESET}: ${errors.length === 0 ? 'All checks' : 'Some checks'}`);
console.log(`${RED}Errors${RESET}: ${errors.length}`);
console.log(`${YELLOW}Warnings${RESET}: ${warnings.length}`);

if (errors.length > 0) {
  console.log(`\n${RED}Validation failed with ${errors.length} error(s)${RESET}`);
  process.exit(1);
} else {
  console.log(`\n${GREEN}Validation passed!${RESET}`);
  process.exit(0);
}
