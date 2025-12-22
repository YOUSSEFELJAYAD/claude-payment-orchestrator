# Skill: Animate Processing State

**Role:** sequential-reasoner (Motion Designer)
**Domain:** UI/UX & Frontend
**Objective:** Implement fluid, reassuring animations for payment processing states with comprehensive MCP integration, agent collaboration, and real-time testing capabilities.

---

## Available Capabilities

### MCP Servers

| Server | Purpose | Key Operations |
|--------|---------|----------------|
| **Serena** | Semantic code analysis | Find React animation components, trace state management, analyze motion patterns |
| **Context7** | Real-time documentation | Framer Motion docs, React Spring patterns, animation libraries |
| **Playwright** | E2E testing | Visual regression, animation timing verification, state transitions |
| **Chrome** | Live browser control | Performance profiling, animation preview, DevTools monitoring |
| **Episodic Memory** | Cross-session context | Past animation decisions, performance issues, UX patterns |

### Superpowers Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `superpowers:brainstorming` | Before animation design | Explore motion design requirements |
| `superpowers:systematic-debugging` | Animation bugs/jank | Root cause analysis for performance |
| `superpowers:test-driven-development` | Before implementation | Write animation tests first |
| `superpowers:verification-before-completion` | Before claiming done | Verify animations perform correctly |
| `superpowers:requesting-code-review` | After implementation | Review animation code quality |

### Specialized Agents

| Agent | Purpose |
|-------|---------|
| `frontend-developer` | React component implementation |
| `shadcn-ui-architect` | Shadcn UI integration patterns |
| `playwright-testing` | Animation testing strategies |
| `code-explorer` | Trace animation execution paths |
| `code-reviewer` | Review animation performance |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PROCESSING STATE ANIMATION                            │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Context7: Get Framer Motion/React Spring docs                        │
│  ├─ Serena: Find existing animation components                           │
│  ├─ Episodic Memory: Recall past animation patterns                      │
│  └─ Agent Dispatch: frontend-developer for architecture                  │
│                                                                           │
│  PHASE 2: DESIGN                                                         │
│  ├─ Brainstorming: Explore motion design approach                        │
│  ├─ Define States: IDLE → ENCRYPTING → PROCESSING → SUCCESS/ERROR        │
│  ├─ Timing: Duration, easing, spring physics                             │
│  └─ Accessibility: Respect prefers-reduced-motion                        │
│                                                                           │
│  PHASE 3: IMPLEMENTATION                                                 │
│  ├─ TDD: Write animation tests first                                     │
│  ├─ Build: Framer Motion variants + AnimatePresence                      │
│  ├─ State Management: Track processing state transitions                 │
│  └─ Performance: Use CSS transforms, avoid layout thrashing              │
│                                                                           │
│  PHASE 4: VERIFICATION                                                   │
│  ├─ Playwright: Visual regression for each state                         │
│  ├─ Chrome: Performance profiling (60fps target)                         │
│  ├─ Code Review: Check animation best practices                          │
│  └─ Serena Memory: Document animation timing patterns                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery & Research

**Context7 Documentation Lookup**
```typescript
// Get Framer Motion latest patterns
const framerDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/framer/motion",
  topic: "AnimatePresence variants keyframes spring",
  mode: "code"
});

// React Spring for physics-based animations
const springDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/pmndrs/react-spring",
  topic: "useSpring useTransition config",
  mode: "code"
});

// Tailwind CSS animation utilities
const tailwindDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/tailwindlabs/tailwindcss",
  topic: "animation keyframes transition",
  mode: "code"
});
```

**Serena Code Analysis**
```typescript
// Find existing animation components
const animationComponents = await mcp_serena.find_symbol({
  name_path_pattern: "Animation|Motion|Animate|Transition",
  substring_matching: true,
  include_body: true,
  depth: 2
});

// Find processing state logic
const processingState = await mcp_serena.search_for_pattern({
  substring_pattern: "processing|loading|submitting|pending",
  relative_path: "src/components",
  context_lines_before: 3,
  context_lines_after: 3
});

// Find motion variants
const motionVariants = await mcp_serena.search_for_pattern({
  substring_pattern: "variants.*=|initial=|animate=|exit=",
  relative_path: "src"
});

// Analyze state management
const stateManagement = await mcp_serena.find_symbol({
  name_path_pattern: "usePaymentState|PaymentContext|paymentStore",
  include_body: true
});
```

**Episodic Memory Search**
```typescript
// Recall past animation implementations
const pastAnimations = await mcp_episodic_memory.search({
  query: ["animation performance", "framer motion", "payment processing"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// Find performance lessons
const perfLessons = await mcp_episodic_memory.search({
  query: "animation jank frame drops optimization",
  mode: "both"
});

// Recall UX feedback
const uxFeedback = await mcp_episodic_memory.search({
  query: ["loading animation", "user feedback", "too fast", "too slow"],
  mode: "text"
});
```

### Phase 2: Design & Planning

**Agent Dispatch**
```json
{
  "requesting_agent": "animate-processing-state",
  "target_agent": "frontend-developer",
  "request_type": "architecture_consultation",
  "payload": {
    "query": "Design animation architecture for payment processing states",
    "context": {
      "states": ["idle", "encrypting", "processing", "success", "error"],
      "constraints": ["60fps", "prefers-reduced-motion", "mobile-friendly"]
    }
  }
}
```

**Brainstorming Skill**
```typescript
// Invoke brainstorming for motion design
// Skill: superpowers:brainstorming
// Explores: Animation timing, easing functions, state transitions
```

### Phase 3: Implementation

**Test-Driven Development**
```typescript
// Write animation tests FIRST
// Skill: superpowers:test-driven-development

// Example test structure:
describe('PaymentButton Animations', () => {
  it('should transition from idle to encrypting state', async () => {
    render(<PaymentButton />);
    const button = screen.getByRole('button', { name: /pay/i });

    fireEvent.click(button);

    // Verify encrypting animation started
    await waitFor(() => {
      expect(button).toHaveAttribute('data-state', 'encrypting');
    });

    // Verify padlock animation visible
    expect(screen.getByTestId('padlock-icon')).toBeInTheDocument();
  });

  it('should respect prefers-reduced-motion', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }));

    render(<PaymentButton />);
    const button = screen.getByRole('button');

    // Should use instant transitions instead of animations
    expect(button).toHaveStyle({ transition: 'none' });
  });
});
```

**Implementation Example**
```typescript
// Framer Motion implementation
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type ProcessingState = 'idle' | 'encrypting' | 'processing' | 'success' | 'error';

const iconVariants = {
  idle: { scale: 1, rotate: 0 },
  encrypting: {
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.6, repeat: Infinity }
  },
  processing: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: 'linear' }
  },
  success: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  error: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 }
  }
};

export function PaymentButton() {
  const [state, setState] = useState<ProcessingState>('idle');
  const shouldReduceMotion = useReducedMotion();

  const handlePay = async () => {
    setState('encrypting');
    await new Promise(resolve => setTimeout(resolve, 1000));

    setState('processing');
    // ... payment logic
  };

  return (
    <motion.button
      onClick={handlePay}
      disabled={state !== 'idle'}
      initial="idle"
      animate={shouldReduceMotion ? 'idle' : state}
      variants={iconVariants}
      className="payment-button"
    >
      <AnimatePresence mode="wait">
        {state === 'idle' && <span key="idle">Pay Now</span>}
        {state === 'encrypting' && (
          <motion.span
            key="encrypting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            🔒 Encrypting...
          </motion.span>
        )}
        {state === 'processing' && (
          <motion.span key="processing">
            <Spinner /> Processing...
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
```

**Serena Memory Storage**
```typescript
// Store animation timing patterns for consistency
await mcp_serena.write_memory({
  memory_file_name: "animation-patterns.md",
  content: `
# Animation Timing Standards

## Payment Processing States
- Encrypting: 600ms loop with 5deg rotation
- Processing: 1s linear rotation
- Success: 500ms scale bounce
- Error: 500ms shake (x-axis)

## Easing Functions
- Default: cubic-bezier(0.4, 0, 0.2, 1)
- Bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
- Spring: { type: "spring", stiffness: 300, damping: 20 }

## Performance
- Use CSS transforms only (translateX, scale, rotate)
- Avoid: margin, padding, width, height animations
- Target: 60fps (16.67ms per frame)
`
});
```

### Phase 4: Testing & Verification

**Playwright Visual Regression**
```typescript
// Test each animation state with screenshots
const states: ProcessingState[] = ['idle', 'encrypting', 'processing', 'success', 'error'];

for (const state of states) {
  // Navigate to Storybook story
  await mcp_playwright.browser_navigate({
    url: `http://localhost:6006/?path=/story/paymentbutton--${state}`
  });

  // Wait for animation to stabilize
  await mcp_playwright.browser_wait_for({ time: 1 });

  // Take screenshot
  await mcp_playwright.browser_take_screenshot({
    filename: `animation-state-${state}.png`,
    fullPage: false
  });

  // Verify accessibility
  const snapshot = await mcp_playwright.browser_snapshot({});
  // Check that state is announced for screen readers
}

// Test animation transitions
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

await mcp_playwright.browser_click({
  element: "Pay Now",
  ref: "pay-button"
});

// Capture mid-animation screenshot
await mcp_playwright.browser_wait_for({ time: 0.3 });
await mcp_playwright.browser_take_screenshot({
  filename: "transition-encrypting.png"
});

// Verify processing state appears
await mcp_playwright.browser_wait_for({ text: "Processing" });
await mcp_playwright.browser_take_screenshot({
  filename: "transition-processing.png"
});

// Test animation timing
const animationDuration = await mcp_playwright.browser_evaluate({
  function: `() => {
    const button = document.querySelector('[data-testid="pay-button"]');
    const style = getComputedStyle(button);
    return style.transitionDuration;
  }`
});
```

**Chrome Performance Profiling**
```typescript
// Monitor animation performance
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Start performance recording
await mcp_chrome.use_browser({
  action: "eval",
  payload: "performance.mark('animation-start')"
});

// Trigger animation
await mcp_chrome.use_browser({
  action: "click",
  selector: "[data-testid='pay-button']"
});

// Check frame rate
const fps = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    (() => {
      let frames = 0;
      let lastTime = performance.now();

      function countFrames() {
        frames++;
        const now = performance.now();
        if (now - lastTime >= 1000) {
          return frames;
        }
        requestAnimationFrame(countFrames);
      }

      return new Promise(resolve => {
        requestAnimationFrame(() => {
          setTimeout(() => resolve(frames), 1000);
          countFrames();
        });
      });
    })()
  `
});

// Screenshot animation in progress
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "animation-performance.png"
});
```

**Code Review**
```json
{
  "requesting_agent": "animate-processing-state",
  "target_agent": "code-reviewer",
  "request_type": "review_animation_code",
  "payload": {
    "file_path": "src/components/PaymentButton.tsx",
    "focus_areas": ["performance", "accessibility", "browser_compatibility"]
  }
}
```

**Verification Skill**
```typescript
// Skill: superpowers:verification-before-completion
// Verify:
// ✓ All animation states render correctly
// ✓ 60fps performance maintained
// ✓ prefers-reduced-motion respected
// ✓ Accessibility announcements work
// ✓ Mobile devices tested
```

---

## MCP Integration Examples

### Serena: Find Animation Components
```typescript
// Find all React components using animations
const components = await mcp_serena.find_symbol({
  name_path_pattern: "Button|Card|Modal|Toast",
  substring_matching: true,
  include_body: true
});

// Search for motion.div usage
const motionUsage = await mcp_serena.search_for_pattern({
  substring_pattern: "motion\\.",
  relative_path: "src/components"
});

// Find CSS animations
const cssAnimations = await mcp_serena.search_for_pattern({
  substring_pattern: "@keyframes|animation:|transition:",
  relative_path: "src/styles"
});

// Analyze performance issues
const perfIssues = await mcp_serena.search_for_pattern({
  substring_pattern: "width:|height:|margin:|padding:",
  relative_path: "src/components",
  context_lines_after: 2
});
```

### Context7: Animation Libraries
```typescript
// Framer Motion hooks
const motionHooks = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/framer/motion",
  topic: "useAnimation useMotionValue useSpring",
  mode: "code"
});

// CSS animations reference
const cssAnimations = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "css animations keyframes",
  mode: "info"
});

// React Transition Group
const transitionGroup = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/reactjs/react-transition-group",
  topic: "CSSTransition TransitionGroup",
  mode: "code"
});
```

### Playwright: Animation Testing
```typescript
// Test smooth state transitions
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Fill form to enable button
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card", type: "textbox", ref: "card", value: "4111111111111111" }
  ]
});

// Click and verify animation
await mcp_playwright.browser_click({
  element: "Pay",
  ref: "pay-btn"
});

// Wait for animation to complete
await mcp_playwright.browser_wait_for({ time: 0.6 });

// Check console for animation errors
const errors = await mcp_playwright.browser_console_messages({
  level: "error"
});

// Network requests during animation
const requests = await mcp_playwright.browser_network_requests({});
```

### Chrome: Live Preview
```typescript
// Preview on mobile viewport
await mcp_chrome.use_browser({
  action: "eval",
  payload: "window.innerWidth = 375; window.innerHeight = 667;"
});

// Trigger animation
await mcp_chrome.use_browser({
  action: "click",
  selector: ".payment-button"
});

// Extract animation state
const currentState = await mcp_chrome.use_browser({
  action: "eval",
  payload: "document.querySelector('.payment-button').dataset.state"
});

// Monitor repaints
const repaintInfo = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    performance.getEntriesByType('paint').map(p => ({
      name: p.name,
      startTime: p.startTime
    }))
  `
});
```

### Episodic Memory: Past Patterns
```typescript
// Search for animation performance fixes
const perfFixes = await mcp_episodic_memory.search({
  query: ["animation jank", "60fps", "transform", "will-change"],
  mode: "both",
  limit: 5
});

// Find successful animation patterns
const successPatterns = await mcp_episodic_memory.search({
  query: "framer motion spring config smooth",
  mode: "vector",
  after: "2024-06-01"
});
```

---

## Agent Dispatch Patterns

### Frontend Architecture
```json
{
  "requesting_agent": "animate-processing-state",
  "target_agent": "frontend-developer",
  "request_type": "implement_animation",
  "payload": {
    "component": "PaymentButton",
    "states": ["idle", "encrypting", "processing", "success", "error"],
    "library": "framer-motion",
    "requirements": {
      "accessibility": true,
      "reduced_motion": true,
      "performance_target": "60fps"
    }
  }
}
```

### UI Component Integration
```json
{
  "requesting_agent": "animate-processing-state",
  "target_agent": "shadcn-ui-architect",
  "request_type": "shadcn_animation_pattern",
  "payload": {
    "query": "How to integrate Framer Motion with Shadcn Button component"
  }
}
```

### Testing Strategy
```json
{
  "requesting_agent": "animate-processing-state",
  "target_agent": "playwright-testing",
  "request_type": "animation_test_strategy",
  "payload": {
    "component": "PaymentButton",
    "test_cases": [
      "visual_regression",
      "timing_verification",
      "accessibility_checks"
    ]
  }
}
```

### Code Review
```json
{
  "requesting_agent": "animate-processing-state",
  "target_agent": "code-reviewer",
  "request_type": "performance_review",
  "payload": {
    "files": ["src/components/PaymentButton.tsx"],
    "focus": ["render_performance", "animation_efficiency", "memory_leaks"]
  }
}
```

---

## Best Practices

### UX Principles
- **Perceived Performance**: Animations make waits feel 30% shorter
- **Trust Building**: Encryption animation reinforces security visually
- **State Clarity**: Each state should be visually distinct
- **Smooth Handoffs**: Use AnimatePresence for seamless transitions
- **Micro-interactions**: Small details create polish

### Performance
- **Use CSS Transforms**: translateX, scale, rotate (GPU-accelerated)
- **Avoid Layout Thrashing**: Never animate margin, width, height
- **Will-change Property**: Use sparingly for critical animations
- **RequestAnimationFrame**: For JavaScript animations
- **60fps Target**: Each frame must complete in <16.67ms

### Accessibility
- **prefers-reduced-motion**: Always respect user preference
- **Screen Reader Announcements**: Use aria-live for state changes
- **Focus Management**: Maintain focus during animations
- **Keyboard Navigation**: Ensure animations don't block keyboard users

### Testing
- **Visual Regression**: Playwright screenshots for each state
- **Performance Profiling**: Chrome DevTools to measure fps
- **Cross-browser**: Test on Safari, Chrome, Firefox
- **Mobile Testing**: Real devices, not just emulators

### Documentation
- **Context7**: Always check latest library patterns first
- **Serena Memory**: Store timing patterns for consistency
- **Episodic Memory**: Learn from past performance issues
- **Code Comments**: Document why specific timing/easing chosen

### State Management
- **Centralized State**: Use context or store for payment state
- **Optimistic UI**: Show success animation immediately, rollback if fails
- **Error Handling**: Graceful error animations, not jarring
- **Loading States**: Minimum 300ms to avoid flash of loading

### Mobile Optimization
- **Touch Feedback**: Immediate visual response to tap
- **Reduced Motion**: More important on mobile (battery, motion sickness)
- **Performance Budget**: Mobile devices have less CPU/GPU power
- **Network Awareness**: Don't animate while waiting for network
