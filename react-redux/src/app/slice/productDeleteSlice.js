import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialValue = {
  status: undefined,
  loading: false,
  error: null,
};

export const deleteProductItem = createAsyncThunk(
  "productDelete/deleteProduct",
  async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_KEY}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteProductItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProductItem.fulfilled, (state) => {
      state.loading = false;
      state.status = "deleted";
    });
    builder.addCase(deleteProductItem.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default productDetailsSlice.reducer;
