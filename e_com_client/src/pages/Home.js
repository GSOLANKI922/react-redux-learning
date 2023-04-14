import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_ALL_PRODUCTS } from "../gqloperation/queries";
import Card from "../component/Card";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
// import { Pagination } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPage, setTotalPage] = useState([]);
  const addtoCart = ({ id, name, price, description, imge }) => {
    addItem({
      id,
      price,
      name,
      images: imge,
      description,
    });
  };

  const { loading, data, error } = useQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  if (loading) return <h1>Loading....</h1>;
  if (error) {
    return <h3>Internal server err...</h3>;
  }

  // const changeHandler = (page, pageSize) => {
  //   setCurrentPage(page);
  // };

  return (
    <div style={{ marginBottom: "10rem" }}>
      <div className="homeroot">
        {data.products?.data?.map(({ id, attributes }) => {
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
        })}
      </div>
      {/* <Pagination
        simple
        pageSize={5}
        defaultCurrent={currentPage}
        total={totalPage.length}
        onChange={changeHandler}
      /> */}
    </div>
  );
};

export default Home;
