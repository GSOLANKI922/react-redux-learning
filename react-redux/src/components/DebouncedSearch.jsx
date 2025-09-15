import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../utils/useDebounce";

const DebounceInput = ({
  onSearch,
  delay = 500,
  placeholder = "Search...",
}) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, delay);
  const prevValue = useRef(""); // keep track of last search

  useEffect(() => {
    if (debouncedValue.trim() !== "" && debouncedValue !== prevValue.current) {
      prevValue.current = debouncedValue;
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  return (
    <input
      type="text"
      value={inputValue}
      placeholder={placeholder}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default DebounceInput;
