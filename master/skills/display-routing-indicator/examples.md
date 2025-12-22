# Examples: Routing Badge Component

## React Code

```tsx
import { ShieldCheck, Zap, Globe } from "lucide-react";

const REQUEST_CONFIG = {
  COST: { icon: ShieldCheck, label: "Best Rate", color: "text-green-600" },
  SPEED: { icon: Zap, label: "Fastest", color: "text-blue-600" },
  GEO: { icon: Globe, label: "Local", color: "text-indigo-600" },
};

export function RoutingBadge({ strategy }) {
  const conf = REQUEST_CONFIG[strategy] || REQUEST_CONFIG.SPEED;
  const Icon = conf.icon;

  return (
    <div
      className={`flex items-center gap-1 text-xs font-medium ${conf.color}`}
    >
      <Icon className="w-3 h-3" />
      <span>{conf.label}</span>
      <span className="text-gray-400">| Optimized</span>
    </div>
  );
}
```
