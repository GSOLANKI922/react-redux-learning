import React, { useState, useEffect } from "react";
import useDebounce from "../utils/useDebounce";

export default function DebouncedSearch({ onSearch }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // delay 500ms

  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
