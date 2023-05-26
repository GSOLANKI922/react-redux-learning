import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increMent: (state, { payload }) => {
      console.log(payload, "payload");
      state.count = state.count + payload;
    },
    decremet: (state, { payload }) => {
      state.count = state.count - payload;
    },
  },
});

export default counterSlice.reducer;
export const { increMent, decremet } = counterSlice.actions;
