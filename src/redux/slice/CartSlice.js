import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    add: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    remove: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: () => {
      return []; 
    },
  },
});

export const { add, remove, clearCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
