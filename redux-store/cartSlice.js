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
                cartItems: state.cartItems.filter((item) => {
                    return item._uid !== action.payload.id;
                }),
            };
        },
        updateCart(state, action) {
            const updatedCartItems = state.cartItems.map((item) => {
                if (item._uid === action.payload.id) {
                    const updatedItem = { ...item, addedQuantity: action.payload.addedQuantity };
                    updatedItem.price = updatedItem.priceBeforeDiscount * updatedItem.addedQuantity;
                    return updatedItem;
                }
                return item;
            });

            return {
                ...state,
                cartItems: updatedCartItems,
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
