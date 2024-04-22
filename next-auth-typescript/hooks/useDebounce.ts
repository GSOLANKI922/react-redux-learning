import React, { useState } from "react";

function useDebounce<T>(value: T, timeOut = 500) {
  const [debounceValue, setDebounceValue] = useState(value);

  React.useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value);
    }, timeOut);

    return () => clearTimeout(id);
  }, [value, timeOut]);

  return debounceValue;
}

export default useDebounce;
