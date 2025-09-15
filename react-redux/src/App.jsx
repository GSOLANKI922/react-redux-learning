import "./App.css";
import "../src/components/ProductCard.css"; // Import the external CSS
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router";
import ProductListWrapper from "./components/productList";
import ProductDetailsWrapper from "./page/ProductDetails";
import NotFound from "./components/NotFound";
import CartWrapper from "./page/Cart";
import WishlistWrapper from "./page/Wishlist";
import Login from "./components/Login";
import AuthLayout from "./components/AuthLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/" element={<ProductListWrapper />} />
          <Route path={"/products/:id"} element={<ProductDetailsWrapper />} />
          <Route path={"/cart"} element={<CartWrapper />} />
          <Route path={"/wishlist"} element={<WishlistWrapper />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
