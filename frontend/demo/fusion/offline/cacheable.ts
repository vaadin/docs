// tag::snippet[]
import { EndpointError } from '@vaadin/hilla-frontend';

const CACHE_KEY = 'offline-cache';

function readCache(): Record<string, unknown> {
  return JSON.parse(localStorage.getItem(CACHE_KEY) ?? '{}') as Record<string, unknown>;
}

/**
 * Calls a service and stores the result in the browser. When the server
 * can't be reached, returns the stored result, or the default value.
 */
export async function cacheable<T>(
  key: string,
  call: () => Promise<T>,
  defaultValue: T
): Promise<T> {
  try {
    const result = await call();
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ...readCache(), [key]: result }));
    return result;
  } catch (error) {
    if (error instanceof EndpointError) {
      // The server answered with an error, such as access denied
      throw error;
    }
    const cached = readCache()[key];
    return cached === undefined ? defaultValue : (cached as T);
  }
}

export function clearCache(): void {
  localStorage.removeItem(CACHE_KEY);
}
// end::snippet[]
