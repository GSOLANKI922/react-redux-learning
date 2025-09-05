import { Select } from "antd";
import { debounce } from "lodash";
import React, { useMemo, useState } from "react";
import { LIMIT } from "@/constants";
import {
  type FetchPolicy,
  WatchQueryFetchPolicy,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import useInfiniteQuery from "@/lib/hooks/useInfiniteQuery";
import { GET_COUNTRIES } from "../graphql/queries";

type QueryOptions = Parameters<typeof useLazyQuery>[1];

type InfiniteSelectProps<Q, V> = {
  minWidth: number;
  limit: number;
  multiple: boolean;
  className: string;
  searchable: boolean;
  dataKeys: {
    data: string;
    count: string;
    records: string;
  };
  fetchPolicy: FetchPolicy;
  queryOptions: QueryOptions;
  variableSelector: ({ skip, limit }: { skip: number; limit: number }) => void;
};

function InfiniteSelect<Q, V>({
  query,
  dataSelector,
  variableSelector,
  dataKeys,
  fetchPolicy = "network-only",
  limit = LIMIT,
  searchable = true,
  multiple = false,
  variables: variables$,
  queryOptions,
  className = "",
  minWidth,
  ...rest
}: InfiniteSelectProps<Q, V>) {
  const [search, setSearch] = useState("");

  const variables = useMemo(
    () => ({ search, ...variables$ }),
    [search, variables$]
  );

  const { data, loading, loadingMore, hasMore, fetchMore } = useInfiniteQuery<
    Q,
    V
  >(query, {
    variableSelector,
    dataKeys,
    fetchPolicy,
    limit,
    variables,
    ...queryOptions,
  });

  const options = useMemo(() => dataSelector(data) || [], [data, dataSelector]);

  const handleSearch = useMemo(() => debounce(setSearch, 500), []);

  const handleScroll = (e) => {
    if (!loading && !loadingMore && hasMore) {
      if (
        e.target?.scrollTop + e.target?.offsetHeight >=
        e?.target?.scrollHeight
      ) {
        fetchMore();
      }
    }
  };

  return (
    <Select
      labelInValue
      loading={loading || loadingMore}
      filterOption={false}
      notFoundContent="Not found"
      onPopupScroll={handleScroll}
      options={options}
      className={className}
      style={{ minWidth }}
      {...(multiple && { mode: "multiple" })}
      {...(searchable && { showSearch: true, onSearch: handleSearch })}
      {...rest}
    />
  );
}

export default InfiniteSelect;
