import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import withLoader from "./withLoader";
import { getProduct } from "../app/slice/productSlice";
import { LIMIT } from "../constatnt";
import Pagination from "./Pagination";
import { deleteProductItem } from "../app/slice/productDeleteSlice";

const productList = ({ items = [], deleteProduct }) => {
  return (
    <div className="product-list-wrraper container">
      {items?.products?.length > 0 &&
        items?.products?.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              deleteProduct={deleteProduct}
            />
          );
        })}
    </div>
  );
};
const ProductListWithLoader = withLoader(productList);

const ProductListWrapper = () => {
  const dispatch = useDispatch();

  const { items, loading, error, total, page, limit } = useSelector(
    (state) => state.product
  );

  const { status, loading: deleteLoading } = useSelector(
    (state) => state.deleteProduct
  );

  useEffect(() => {
    dispatch(getProduct({ limit: LIMIT, page: 1 }));
  }, [dispatch]);

  const deleteProduct = (id) => {
    dispatch(deleteProductItem(id));
    if (status === "deleted") {
      dispatch(getProduct({ limit: LIMIT, page: 1 }));
    }
  };
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <ProductListWithLoader
        items={items}
        loading={loading || deleteLoading}
        error={error}
        deleteProduct={deleteProduct}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            dispatch(getProduct({ page: newPage, limit }));
          }}
        />
      )}
    </>
  );
};

export default ProductListWrapper;
