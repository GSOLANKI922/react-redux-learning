import { GetCurrentUserDocument } from "@/__generated__/graphql";
import { LIMIT } from "@/constants";
import { NetworkStatus, useLazyQuery } from "@apollo/client";
import get from "lodash/get";
import isArray from "lodash/isArray";
import isFunction from "lodash/isFunction";
import { useCallback, useEffect, useState } from "react";

type useInfiniteQueryProps = {
  skip: number;
  limit:number;
  variables:
};

const getKey = (key) => [...(isArray(key) ? key : [key])];

const useInfiniteQuery = (
  query,
  { variables, variableSelector, dataKeys, limit = LIMIT, skip, ...rest }
) => {
  const [networkStatus, setNetworkStatus] = useState(NetworkStatus.ready);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const handleResponse = useCallback(
    (res) => {
      setNetworkStatus(NetworkStatus.ready);

      if (dataKeys && dataKeys.records && dataKeys.data) {
        const records = get(res, [dataKeys.data, ...getKey(dataKeys.records)]);

        if (isArray(records)) setData(records);
      }
      if (res && dataKeys && dataKeys.count && dataKeys.data) {
        setCount(get(res, [dataKeys.data, ...getKey(dataKeys.count)]) ?? 0);
      }
    },
    [dataKeys]
  );

  GetCurrentUserDocument

  const [fetchData, { data: data$, fetchMore: fetchMore$, refetch: refetch$ }] =
    useLazyQuery(query, {
      ...(isFunction(variableSelector) && {
        variables: variableSelector({ skip: 0, limit, ...variables }),
      }),
      onError: () => {
        setNetworkStatus(NetworkStatus.ready);
        // do nothing
      },
      onCompleted: handleResponse,

      ...rest,
    });

  const loading = [NetworkStatus.loading, NetworkStatus.refetch].includes(
    networkStatus
  );
  const loadingMore = networkStatus === NetworkStatus.fetchMore;
  const fetching = loading || loadingMore;
  const hasMore = data.length < count;
  const canFetch = hasMore && !fetching;
  const recordsLength = data.length;

  useEffect(() => {
    if (skip) return;
    setNetworkStatus(NetworkStatus.loading);
    fetchData({
      ...(isFunction(variableSelector) && {
        variables: variableSelector({ skip: 0, limit, ...variables }),
      }),
    });
  }, [fetchData, variables, limit, variableSelector, skip]);

  const fetchMore = useCallback(async () => {
    setNetworkStatus(NetworkStatus.fetchMore);
    try {
      if (canFetch) {
        const { data: res, errors } = await fetchMore$({
          variables: variableSelector({
            limit,
            skip: recordsLength,
            ...variables,
          }),
        });
        if (!errors && dataKeys?.records && dataKeys?.data && dataKeys?.count) {
          setData((prev) => [
            ...prev,
            ...get(res, [dataKeys.data, ...getKey(dataKeys.records)]),
          ]);
          setCount(get(res, [dataKeys.data, ...getKey(dataKeys.count)]));
        }
      }
    } catch (err) {
      // do nothing
    } finally {
      setNetworkStatus(NetworkStatus.ready);
    }
  }, [
    fetchMore$,
    canFetch,
    recordsLength,
    limit,
    dataKeys,
    variableSelector,
    variables,
  ]);

  const updateData = useCallback((id, callback) => {
    setData((prev) =>
      prev.map((item) => {
        if (isFunction(id) ? id(item) : item?.id === id) {
          if (isFunction(callback)) {
            const newItem = callback(item);
            if (newItem) return newItem;
          }
        }
        return item;
      })
    );
  }, []);

  const appendData = useCallback((record) => {
    setData((prev) => [record, ...prev]);
    setCount((prev) => prev + 1);
  }, []);

  const removeData = useCallback((id) => {
    setData((prev) => prev.filter((item) => item?.id !== id));
    setCount((prev) => prev - 1);
  }, []);

  const refetch = useCallback(
    async (selector) => {
      setNetworkStatus(NetworkStatus.refetch);
      try {
        const { data: refetchData, errors } = await refetch$(
          isFunction(selector) &&
            selector({
              limit,
              skip: recordsLength,
              ...variables,
            })
        );
        if (errors) throw new Error(errors);
        if (refetchData) handleResponse(refetchData);
      } catch (_) {
        // do nothing
      }
    },
    [refetch$, variables, recordsLength, limit, handleResponse]
  );

  return {
    data,
    count,
    loading,
    loadingMore,
    fetching,
    hasMore,
    originalData: data$,
    fetchMore,
    updateData,
    removeData,
    appendData,
    refetch,
  };
};

export default useInfiniteQuery;
