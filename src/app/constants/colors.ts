export const COLORS = {
  // Primary brand color
  primary: '#805232',
  primaryDark: '#6b4427',
  primaryLight: '#a67557',

  // Status colors
  success: '#3b6d11',
  successLight: '#e8f4e8',
  warning: '#d4a373',
  warningLight: '#fef1d1',
  danger: '#dc2626',
  dangerLight: '#fee2e2',
  info: '#0284c7',
  infoLight: '#e0f2fe',

  // Background colors
  bgLight: '#f5efe8',
  bgLighter: '#faf9f7',
  bgDark: '#4a3728',
  bgDarkText: '#ffffff',

  // Border colors
  borderLight: '#e8d8c8',
  borderDefault: '#d1d5db',
  borderDark: '#6b7280',

  // Text colors
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  textLight: '#f3f4f6',

  // Neutral grays
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Kids mode colors
  kidsGreen: '#00FF00',
  kidsCyan: '#00FFFF',
  kidsBlue: '#0099FF',
  kidsBlack: '#000000',

  // Utility colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const BUTTON_STYLES = {
  primary: {
    bg: COLORS.primary,
    text: COLORS.white,
    hover: COLORS.primaryDark,
    border: COLORS.primary,
  },
  secondary: {
    bg: COLORS.gray[100],
    text: COLORS.textPrimary,
    hover: COLORS.gray[200],
    border: COLORS.borderDefault,
  },
  danger: {
    bg: COLORS.danger,
    text: COLORS.white,
    hover: '#b91c1c',
    border: COLORS.danger,
  },
  success: {
    bg: COLORS.success,
    text: COLORS.white,
    hover: '#2d5a0f',
    border: COLORS.success,
  },
} as const;

export const CARD_STYLES = {
  default: {
    bg: COLORS.white,
    border: COLORS.borderDefault,
    text: COLORS.textPrimary,
  },
  light: {
    bg: COLORS.bgLighter,
    border: COLORS.borderLight,
    text: COLORS.textPrimary,
  },
  success: {
    bg: COLORS.successLight,
    border: COLORS.success,
    text: COLORS.textPrimary,
  },
  warning: {
    bg: COLORS.warningLight,
    border: COLORS.warning,
    text: COLORS.textPrimary,
  },
} as const;

export const INPUT_STYLES = {
  default: {
    bg: COLORS.white,
    border: COLORS.borderDefault,
    text: COLORS.textPrimary,
    focus: COLORS.primary,
  },
  dark: {
    bg: COLORS.bgDark,
    border: COLORS.primary,
    text: COLORS.white,
    focus: COLORS.primary,
  },
} as const;

export const PROGRESS_BAR = {
  empty: COLORS.gray[200],
  partial: COLORS.primary,
  complete: COLORS.success,
} as const;

export const RING_COLORS = {
  outer: COLORS.gray[200],
  fill: COLORS.primary,
  text: COLORS.primary,
} as const;

// Colors for the task tracking redesign (Today/Weekly/Monthly tabs)
export const TRACKING_COLORS = {
  ringGreen: '#1D9E75',
  ringAmber: '#EF9F27',
  ringRed: '#E24B4A',
  todayBlue: '#378ADD',
  doneDot: '#1D9E75',
  missedDot: '#F09595',
  monthFull: '#1D9E75',
  monthPartial: '#9FE1CB',
  monthMissed: '#F7C1C1',
  pillGreenBg: '#E1F5EE',
  pillGreenText: '#0F6E56',
  pillAmberBg: '#FAEEDA',
  pillAmberText: '#854F0B',
  pillRedBg: '#FCEBEB',
  pillRedText: '#A32D2D',
} as const;

export const GOAL_DOT_COLORS = [
  '#1D9E75', '#378ADD', '#7F77DD', '#EF9F27', '#E24B4A', '#F09595', '#805232',
] as const;
