/**
 * Shared image URL validation utilities.
 * Use these helpers to guard `<Image>` / `<img>` src props so that
 * Next.js never receives an invalid URL (empty string, whitespace,
 * broken short-links like bit.ly, malformed protocol URLs, etc.).
 */

export const DEFAULT_FOOD_IMAGE = '/assets/images/sample-food3.jpg';
export const DEFAULT_AVATAR = '/assets/images/sample-avatar.png';

/**
 * Check whether a string is a parseable URL when it looks absolute.
 * Relative paths (starting with `/`) are always accepted.
 */
function isValidUrl(src: string): boolean {
  // Relative paths are always safe for Next.js Image
  if (src.startsWith('/')) return true;
  // Data / blob URLs are safe
  if (src.startsWith('data:') || src.startsWith('blob:')) return true;
  // For absolute URLs, verify they can be parsed by the URL constructor
  try {
    new URL(src);
    return true;
  } catch {
    return false;
  }
}

/**
 * Return a safe image URL for food/recipe images.
 * Falls back to `DEFAULT_FOOD_IMAGE` when the value is falsy,
 * not a string, blank, a known-broken short URL, or a malformed URL.
 */
export function getSafeImageUrl(
  url: unknown,
  fallback: string = DEFAULT_FOOD_IMAGE,
): string {
  if (!url) return fallback;
  if (typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (trimmed === '') return fallback;
  if (trimmed.includes('bit.ly')) return fallback;
  if (!isValidUrl(trimmed)) return fallback;
  return trimmed;
}

/**
 * Return a safe avatar URL.
 * Same logic as `getSafeImageUrl` but defaults to `DEFAULT_AVATAR`.
 */
export function getSafeAvatarUrl(url: unknown): string {
  return getSafeImageUrl(url, DEFAULT_AVATAR);
}
