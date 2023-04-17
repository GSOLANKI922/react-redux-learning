import React, { useEffect, useState, useTransition } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PRODUCT } from "../gqloperation/queries";
import { Link } from "react-router-dom";

const Search = () => {
  const [serchData, setSerchData] = useState("");
  const [delaySerchData, setDelaySerchData] = useState("");
  const [searchDataFor, { data, loading, error }] = useLazyQuery(
    SEARCH_PRODUCT,
    {
      variables: {
        filters: {
          name: {
            startsWith: delaySerchData,
          },
        },
        pagination: {
          pageSize: 9999999,
        },
      },
    }
  );

  useEffect(() => {
    if (delaySerchData.length !== 0) {
      searchDataFor();
    }
  }, [delaySerchData]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Internal Server Err...</h1>;

  const searchHandler = (e) => {
    setSerchData(e.target.value);
    setTimeout(() => {
      setDelaySerchData(serchData);
    }, 1000);
  };

  return (
    <div className="searchBar">
      <input
        className="search_input_filed"
        placeholder="Search Product"
        value={serchData}
        type="text"
        onChange={searchHandler}
      />
      <div
        className="serch_container"
        style={{ display: serchData.length !== 0 ? "" : "none" }}
      >
        <ul className="search_wrapper">
          {data ? (
            data.products.data.map(({ attributes, id }) => {
              return (
                <>
                  <Link
                    to={`/product/${id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <li className="search_result">{attributes.name}</li>
                  </Link>
                </>
              );
            })
          ) : (
            <h2>No search Result</h2>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Search;
