import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "../components/ProductDetails";
import withLoader from "../components/withLoader";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getProductDetails } from "../app/slice/productDetailsSlice";

const ProductDetailsWithLoader = withLoader(ProductDetails);

const ProductDetailsWrapper = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, error, loading } = useSelector(
    (state) => state?.getProductDetails
  );

  const data = useSelector((state) => state.getProductDetails);
  console.log(data, "datadatadata");

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <ProductDetailsWithLoader
      product={product}
      loading={loading}
      error={error}
    />
  );
};

export default ProductDetailsWrapper;
