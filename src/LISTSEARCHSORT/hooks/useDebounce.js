import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debaouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeOut);
    };
  }, [value, delay]);

  return debaouncedValue;
};

export default useDebounce;
