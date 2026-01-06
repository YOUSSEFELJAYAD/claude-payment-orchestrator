# I got tired of re-explaining payment flows to Claude every session, so I built this

Look, I've been building payment systems for a while now. Stripe, CyberSource, MPGS - the usual suspects. And every time I fire up Claude Code, I spend the first 15 minutes going "okay so we have this checkout flow, and there's a 3DS challenge, and we need PCI compliance, and..."

Then the session ends. Or memory compacts. And I'm back to square one.

After the 50th time explaining what an IPaymentProvider interface is, I snapped and spent a few weeks building a proper config.

---

## What it actually does

It's basically a .claude folder you drop into your project. Comes with:

**15 agents** - think of them as specialized personas. There's one that only knows CyberSource inside out. Another that's obsessed with PCI compliance. One for React checkout UIs. You get the idea.

**46 skills** - these are like recipes. "How to tokenize a card without storing PAN." "How to handle 3DS challenges." "How to set up PSP failover." Instead of explaining it every time, I just invoke the skill.

**The session persistence thing** - this is the part I'm most proud of honestly. It auto-saves your context before memory compacts, and auto-restores after. You can literally close Claude, come back tomorrow, and it picks up exactly where you left off. No more "as I mentioned earlier..." because there is no earlier anymore.

---

## How I actually use it

I type `/payment integrate Stripe` and it just... works? It checks what I've built before (episodic memory), grabs the latest Stripe docs (Context7), looks at my existing code (Serena), and starts implementing.

When it's done, it runs the tests with Playwright, checks the Stripe dashboard with Chrome automation, and saves what it learned for next time.

The security agent is pretty nuts too. It scans for hardcoded secrets, checks for SQL injection patterns, validates PCI scope boundaries. Stuff I used to do manually with grep and prayer.

---

## The hooks are clutch

I set up hooks that fire automatically:

- **Session starts** → restores previous context
- **Before memory compacts** → saves everything silently
- **After compact** → restores silently, keeps working
- **Before writing code** → "hey did you check the docs first?"
- **Before saying done** → "did you actually run the tests?"

That last one has saved me so many times. I used to say "done!" and then realize I never ran `bun test`.

---

## Stuff I learned building this

1. **Agents need constraints.** My first version had agents that could do everything. Terrible idea. The CyberSource agent now only has read access - it advises, doesn't write. Much better.

2. **Skills should be atomic.** "Build entire checkout" is a bad skill. "Tokenize card" is a good skill. Small pieces compose better.

3. **Memory is everything.** The episodic memory MCP changed how I work. It searches past conversations. So when I hit a weird CyberSource error, it can find when I solved it 3 months ago.

4. **Hooks > discipline.** I tried to "remember" to save context. Never worked. Automated hooks do it for me.

---

## What's in the box

```
master/
├── agents/        # 15 payment/security/frontend specialists
├── skills/        # 46 reusable workflows
├── commands/      # /payment, /security, /frontend, etc.
├── hooks/         # auto-save, auto-restore, verification
└── settings.json  # permissions
```

MCP servers I use with it:
- **Serena** - code analysis, finds symbols, traces flows
- **Context7** - live docs for Stripe/Adyen/whatever
- **Playwright** - E2E tests the checkout flows
- **Chrome** - checks PSP dashboards, monitors transactions
- **Episodic Memory** - remembers past sessions

---

## The payment stuff specifically

If you're doing payment work, here's what's baked in:

- PSP adapter pattern (common interface, swap providers easily)
- 3DS 2.x challenge handling
- Webhook signature verification
- Idempotency key management
- Smart routing logic
- Failover between PSPs
- PCI DSS compliance checks (daily/weekly/monthly automated)
- Fraud velocity detection

The CyberSource and MPGS agents are pretty deep. Like, they know the specific error codes, the Decision Manager rules, the authentication quirks. Stuff that normally lives in my head or buried in Confluence.

---

## Installation is boring

```bash
git clone https://github.com/YOUSSEFELJAYAD/claude-payment-orchestrator.git
cp -r master/ your-project/.claude/
```

That's it. Next time you run `claude` in your project, it loads everything.

---

## Honest limitations

- It's opinionated toward my stack (TypeScript, Next.js, Postgres, Bun)
- The PSP coverage is limited to what I've actually built (Stripe, CyberSource, MPGS)
- Some skills are more polished than others
- You need the MCP servers set up separately

---

## Why I'm sharing this

I built it for myself but figured others doing payment work might find it useful. Also hoping people extend it - there's like 50 PSPs out there I haven't touched.

If you're building fintech stuff with Claude Code and tired of the context dance, give it a shot.

---

**Repo:** https://github.com/YOUSSEFELJAYAD/claude-payment-orchestrator

Happy to answer questions. Especially about payment edge cases because I've hit most of them at this point lol.
