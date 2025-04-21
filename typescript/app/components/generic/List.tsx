import React from "react";

export default function List<T>({
  data,
  renderItem,
  getUniqueKey,
}: {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  getUniqueKey: (item: T) => React.Key;
}) {
  return (
    <ul>
      {data.map((item) => (
        <li key={getUniqueKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
