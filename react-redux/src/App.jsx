import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./components/productList";
import { useEffect } from "react";
import { getProduct } from "./app/slice/productSlice";
import "../src/components/ProductCard.css"; // Import the external CSS
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import { LIMIT } from "./constatnt";
import withLoader from "./components/withLoader";

const ProductListWithLoader = withLoader(ProductList);

function App() {
  const dispatch = useDispatch();
  const { items, loading, error, total, page, limit } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProduct({ limit: LIMIT, page: 1 }));
  }, [dispatch]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <Header />
      <ProductListWithLoader items={items} loading={loading} error={error} />
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
}

export default App;
