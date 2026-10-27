import type { LocationQueryValue } from 'vue-router'

export function getSafeRedirect(
  value: LocationQueryValue | LocationQueryValue[] | undefined,
  fallback = '/',
): string {
  if (typeof value !== 'string') return fallback
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return fallback

  return value
}
