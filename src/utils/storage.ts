/**
 * Safe LocalStorage wrapper with in-memory fallback.
 * Prevents mobile browsers (like iOS Safari in Private Browsing mode or webviews
 * with disabled cookies/site storage) from throwing unhandled SecurityError exceptions.
 */

const memoryStore: Record<string, string> = {};

function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const isAvailable = typeof window !== 'undefined' ? isLocalStorageAvailable() : false;

export function safeGetLocalStorage(key: string): string | null {
  try {
    if (isAvailable && typeof window !== 'undefined') {
      return window.localStorage.getItem(key);
    }
  } catch {
    // Fall back to memoryStore on access error
  }
  return memoryStore[key] ?? null;
}

export function safeSetLocalStorage(key: string, value: string): void {
  memoryStore[key] = value;
  try {
    if (isAvailable && typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Silent fallback to memory storage
  }
}

export function safeRemoveLocalStorage(key: string): void {
  delete memoryStore[key];
  try {
    if (isAvailable && typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Silent fallback
  }
}
