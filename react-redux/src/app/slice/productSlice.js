import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ page = 1, limit = 10, search = "" }) => {
    const skip = (page - 1) * limit;
    let url = `${import.meta.env.VITE_API_KEY}/?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `${
        import.meta.env.VITE_API_KEY
      }/search?q=${search}&limit=${limit}&skip=${skip}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    return { ...data, page, limit, search };
  }
);

const initialValue = {
  status: undefined,
  items: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};
const productReducer = createSlice({
  name: "product",
  initialState: initialValue,
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      console.log(action.payload);
      state.total = +action.payload.total;
      state.page = +action.payload.page;
      state.limit = +action.payload.limit;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});
export default productReducer.reducer;
