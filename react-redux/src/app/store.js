import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";
import productReducer from "./slice/productSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    product: productReducer,
  },
});

export default store;
