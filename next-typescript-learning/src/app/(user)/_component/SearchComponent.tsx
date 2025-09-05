import { USER_FILTERS } from "@/constants";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

let searchDebounce: any | null = null;

interface SearchData {
  name?: string;
  getData?: (value: string) => void; // Adjust the return type if `getData` returns something
  defaultValue: string;
}

const SearchComponent: React.FC<SearchData> = (props) => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    searchParams.get(USER_FILTERS.Search) || ""
  );
  const { name = "", getData, ...rest } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    setQuery(value);
    if (getData) {
      if (searchDebounce) {
        searchDebounce.cancel();
        searchDebounce = null;
      }
      searchDebounce = debounce(getData, 500);
      searchDebounce(value);
    }
  };

  return (
    <Input
      className="search-component"
      allowClear
      placeholder={`Search ${name}`}
      value={query}
      name={name}
      onChange={handleChange}
      suffix={<SearchOutlined />}
      {...rest}
    />
  );
};

export default SearchComponent;
