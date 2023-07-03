import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
    },
    updateCart: (state, action) => {
      state.cartItems = action.payload;
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
