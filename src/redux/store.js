import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/CartSlice";

const loadCart = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};


const saveCart = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  } catch {}
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCart(),
  },
});

store.subscribe(() => {
  saveCart(store.getState());
});
