'use client';

import NextImage, { ImageProps } from 'next/image';
import { useState, useCallback } from 'react';

const DEFAULT_FALLBACK = '/assets/images/sample-food3.jpg';

function isSafeString(src: string): boolean {
  const trimmed = src.trim();
  if (trimmed === '' || trimmed.includes('bit.ly')) return false;
  if (trimmed.startsWith('/') || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) return true;
  try { new URL(trimmed); return true; } catch { return false; }
}

/**
 * Drop-in replacement for next/image that silently swaps to a fallback
 * whenever the `src` is invalid (empty, whitespace, bit.ly, malformed URL, etc.)
 * or whenever the image fails to load at runtime.
 */
const SafeImage = ({ src, onError, ...rest }: ImageProps) => {
  const [errored, setErrored] = useState(false);

  const safeSrc = (() => {
    if (errored) return DEFAULT_FALLBACK;
    if (!src) return DEFAULT_FALLBACK;
    if (typeof src === 'string') {
      return isSafeString(src) ? src.trim() : DEFAULT_FALLBACK;
    }
    // StaticImageData or { default: StaticImageData } — always valid
    return src;
  })();

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (!errored) setErrored(true);
      onError?.(e);
    },
    [errored, onError],
  );

  return <NextImage {...rest} src={safeSrc} onError={handleError} />;
};

export default SafeImage;
