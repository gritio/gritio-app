# Standardized Color System

This guide explains how to use the standardized color palette across the application.

## Importing Colors

```typescript
import { COLORS, BUTTON_STYLES, CARD_STYLES, INPUT_STYLES, PROGRESS_BAR, RING_COLORS } from '../constants/colors';
```

## Color Categories

### Primary Colors
- `COLORS.primary` - Main brand color (#805232, brown)
- `COLORS.primaryDark` - Darker variant (#6b4427)
- `COLORS.primaryLight` - Lighter variant (#a67557)

### Status Colors
- `COLORS.success` - Success state (#3b6d11, green)
- `COLORS.warning` - Warning state (#d4a373, amber)
- `COLORS.danger` - Danger/error state (#dc2626, red)
- `COLORS.info` - Info state (#0284c7, blue)

### Background Colors
- `COLORS.bgLight` - Light background (#f5efe8)
- `COLORS.bgDark` - Dark background (#4a3728)
- `COLORS.bgDarkText` - Text on dark backgrounds (#ffffff)

### Text Colors
- `COLORS.textPrimary` - Main text (#1f2937)
- `COLORS.textSecondary` - Secondary text (#6b7280)
- `COLORS.textMuted` - Muted text (#9ca3af)
- `COLORS.textLight` - Light text (#f3f4f6)

### Gray Palette
- `COLORS.gray[50|100|200|300|400|600|700|800|900]` - Grayscale options

### Kids Mode Colors
- `COLORS.kidsGreen` - Bright green (#00FF00)
- `COLORS.kidsCyan` - Bright cyan (#00FFFF)
- `COLORS.kidsBlue` - Bright blue (#0099FF)

## Usage Examples

### Using with Inline Styles
```typescript
<h1 style={{ color: COLORS.primary }}>Title</h1>
<div style={{ backgroundColor: COLORS.bgLight }}>Content</div>
```

### Using with Conditional Colors
```typescript
<p style={{ color: isKidsMode ? COLORS.kidsGreen : COLORS.primary }}>Text</p>
```

### Using Color Presets
```typescript
// Buttons
<button style={{ 
  backgroundColor: BUTTON_STYLES.primary.bg,
  color: BUTTON_STYLES.primary.text
}}>
  Click me
</button>

// Cards
<div style={{
  backgroundColor: CARD_STYLES.default.bg,
  borderColor: CARD_STYLES.default.border
}}>
  Card content
</div>

// Progress Bars
<div style={{ backgroundColor: dayValue >= target ? PROGRESS_BAR.complete : PROGRESS_BAR.partial }} />
```

## Guidelines

1. **Never use hex codes directly** - Always reference `COLORS` constants
2. **Use inline styles** for custom hex colors that aren't part of Tailwind's default palette
3. **For Tailwind classes**, only use standard colors like `bg-white`, `text-gray-600`, etc.
4. **Kids mode** - Always check `isKidsMode` prop and use kids-specific colors when true
5. **Status colors** - Use `COLORS.success`, `COLORS.warning`, `COLORS.danger` for status indicators
6. **Consistency** - If you add new colors, add them to `colors.ts` first

## Examples in Components

### WeeklyTaskView
```typescript
<h1 style={{ color: isKidsMode ? COLORS.kidsGreen : COLORS.primary }}>
  Weekly Tasks
</h1>

<div style={{ backgroundColor: PROGRESS_BAR.complete }}>
  Progress bar
</div>
```

### GoalsOverviewNew
```typescript
<span style={{ color: COLORS.primary }}>{count}</span>

<div style={{ backgroundColor: COLORS.successLight }}>
  Success state
</div>
```

## Color Reference Chart

| Color | Usage | Value |
|-------|-------|-------|
| primary | Main brand color | #805232 |
| success | On track, completed | #3b6d11 |
| warning | Behind schedule | #d4a373 |
| danger | Errors, risks | #dc2626 |
| textPrimary | Main text | #1f2937 |
| textSecondary | Subtitle, helper text | #6b7280 |
| bgLight | Light backgrounds | #f5efe8 |
| bgDark | Dark backgrounds | #4a3728 |
| kidsGreen | Kids mode accent | #00FF00 |
| kidsCyan | Kids mode alt | #00FFFF |
