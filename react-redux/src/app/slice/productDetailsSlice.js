import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialValue = {
  status: undefined,
  product: null,
  loading: true,
  error: null,
};

export const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_KEY}/${id}`);
    const data = await res.json();
    return data;
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default productDetailsSlice.reducer;
