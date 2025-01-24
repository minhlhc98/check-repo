"use client";

import { useEffect, useRef, useState } from "react";

export function useDebouncedValue<TValue>(value: TValue, timeout = 500) {
  const [debouncedValue, setDebouncedValue] = useState<TValue>(value);
  const timeoutId = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (timeoutId) {
      window.clearTimeout(timeoutId.current);
    }
    timeoutId.current = window.setTimeout(() => {
      setDebouncedValue(value);
    }, timeout || 300);
  }, [value]);

  return debouncedValue;
}
