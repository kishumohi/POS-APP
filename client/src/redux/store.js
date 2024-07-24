import { configureStore } from "@reduxjs/toolkit";
import Cart from "./CartItemCount.js";
export const store = configureStore({
  reducer: Cart,
});
