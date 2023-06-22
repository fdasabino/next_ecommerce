import { createSlice } from "@reduxjs/toolkit";

export const countrySlice = createSlice({
  name: "products",
  initialState: {},
  reducers: {
    setProducts: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProducts } = countrySlice.actions;
export default countrySlice.reducer;
