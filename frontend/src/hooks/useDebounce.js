// frontend/src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of the given value.
 * Only updates after the user has stopped typing for `delay` ms.
 */
export const useDebounce = (value, delay = 350) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
