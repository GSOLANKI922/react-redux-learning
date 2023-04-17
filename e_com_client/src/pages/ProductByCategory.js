import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCT_BY_CATEGORIES } from "../gqloperation/queries";
import Card from "../component/Card";
import { useCart } from "react-use-cart";

const ProductByCategory = () => {
  const { addItem } = useCart();
  const { cid } = useParams();
  const [getCategort, { data, loading, error }] = useLazyQuery(
    GET_PRODUCT_BY_CATEGORIES,
    {
      variables: {
        categoryId: cid,
        pagination: {
          pageSize: 9999999999,
        },
      },
    }
  );
  const addtoCart = ({ id, name, price, description, imge }) => {
    addItem({
      id,
      price,
      name,
      images: imge,
      description,
    });
  };
  useEffect(() => {
    getCategort();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Internal Server Err...</h1>;

  return (
    <div style={{ marginBottom: "10rem" }}>
      <div className="homeroot">
        {data ? (
          data.category?.data?.attributes.products.data.map(
            ({ id, attributes }) => {
              return (
                <>
                  <Card
                    id={id}
                    name={attributes.name}
                    price={attributes.price}
                    description={attributes.description}
                    imge={attributes.images.data[0].attributes.url}
                    cartAdded={addtoCart}
                  />
                </>
              );
            }
          )
        ) : (
          <h1>Loadding...</h1>
        )}
      </div>
    </div>
  );
};

export default ProductByCategory;
