import { useEffect, useState } from "react";

// const debouncedValue = useDebounce<string>(value, 500)

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearInterval(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
