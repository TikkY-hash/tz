import { useRef } from "react";

export function useThrottle<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
) {
  const lastCall = useRef(0);

  return (...args: Args) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  };
}
