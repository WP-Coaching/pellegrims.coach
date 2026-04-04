export const MOTION_DURATION = {
  fast: 0.35,
  normal: 0.45,
} as const;

export const MOTION_DELAY = {
  none: 0,
  xs: 0.08,
  sm: 0.12,
  md: 0.16,
  lg: 0.2,
  xl: 0.24,
  xxl: 0.28,
  xxxl: 0.32,
} as const;

export const MOTION_STAGGER_STEP = 0.06;

export function staggerDelay(
  index: number,
  start: number = 0,
  step: number = MOTION_STAGGER_STEP
): number {
  return start + index * step;
}
