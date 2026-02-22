# Shared UI Components

This document lists all reusable UI components available in `shared/ui/`.

## Available Components

### 1. **Badge Component** (`app-badge`)
Displays status badges with different variants.

**Usage:**
```html
<app-badge variant="active">Active</app-badge>
<app-badge variant="balanced">Balanced</app-badge>
<app-badge variant="closed">Closed</app-badge>
<app-badge variant="high-risk">High Risk</app-badge>
```

**Variants:** `active` | `balanced` | `closed` | `high-risk` | `default`

---

### 2. **Card Component** (`app-card`)
A reusable card container with consistent styling.

**Usage:**
```html
<app-card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</app-card>
```

---

### 3. **Stat Component** (`app-stat`)
Displays label/value pairs, useful for metrics and statistics.

**Usage:**
```html
<app-stat label="Total Value">
  $125,000
</app-stat>

<app-stat label="Return" [positive]="true">
  +12.5%
</app-stat>

<app-stat label="Loss" [negative]="true">
  -3.1%
</app-stat>
```

**Inputs:**
- `label` (required): The label text
- `positive`: Highlights value in green
- `negative`: Highlights value in red

---

### 4. **Progress Bar Component** (`app-progress-bar`)
Displays segmented progress bars (useful for asset allocation, etc.).

**Usage:**
```typescript
// In component
segments = signal<ProgressSegment[]>([
  { color: '#6c63ff', width: '40%' },
  { color: '#00b894', width: '30%' },
  { color: '#fdcb6e', width: '30%' }
]);
```

```html
<app-progress-bar [segments]="segments()" />
```

---

### 5. **Button Component** (`app-button`)
Standardized button with multiple variants.

**Usage:**
```html
<app-button variant="primary">Primary Button</app-button>
<app-button variant="secondary">Secondary Button</app-button>
<app-button variant="outline">Outline Button</app-button>
<app-button variant="ghost">Ghost Button</app-button>
<app-button [disabled]="true">Disabled Button</app-button>
```

**Variants:** `primary` | `secondary` | `outline` | `ghost`

**Inputs:**
- `variant`: Button style variant (default: `primary`)
- `disabled`: Disable the button (default: `false`)
- `type`: Button type - `button` | `submit` | `reset` (default: `button`)

---

### 6. **Tab Component** (`app-tab`)
Simple tab wrapper component (already existed).

**Usage:**
```html
<app-tab>
  Tab content
</app-tab>
```

---

## Migration Guide

These components can replace duplicated code in features:

- **Badge**: Replace `<span class="badge">` patterns in dashboard and portfolios
- **Card**: Replace `.portfolio-card`, `.summary-card`, `.metric-card` classes
- **Stat**: Replace `.stat` div patterns with label/value pairs
- **Progress Bar**: Replace `.mix-bar` and `.bar-bg` patterns
- **Button**: Replace button classes like `.primary`, `.secondary`, `.create-btn`, `.manage-btn`

## Benefits

✅ **Consistency**: All features use the same UI components  
✅ **Maintainability**: Update styling in one place  
✅ **Reusability**: Easy to use across features  
✅ **Type Safety**: TypeScript types for variants and inputs  
✅ **Performance**: Standalone components with OnPush change detection
