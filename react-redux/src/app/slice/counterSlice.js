import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialValue,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value > 0 ? (state.value -= 1) : (state.value = 0);
    },
    remove: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, remove } = counterSlice.actions;
export default counterSlice.reducer;
