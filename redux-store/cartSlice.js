import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    },
    removeFromCart(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
      };
    },
    updateCart(state, action) {
      return {
        ...state,
        cartItems: action.payload,
      };
    },
    clearCart(state) {
      return {
        ...state,
        cartItems: [],
      };
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
