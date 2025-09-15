import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import productReducer from "./slice/productSlice";
import productDetailsReducer from "./slice/productDetailsSlice";
import productDeleteReducer from "./slice/productDeleteSlice";
import cartReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    getProductDetails: productDetailsReducer,
    deleteProduct: productDeleteReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
