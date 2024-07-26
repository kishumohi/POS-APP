import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  cartItems: [],
};
const CounterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    PulsItemCart: (state, action) => {
      const { id } = action.payload;
      // Find the item in the cart and update its quantity
      const updatedCart = state.cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      // Update the state with the new cart items
      return {
        ...state,
        cartItems: updatedCart,
      };
    },
    MinusItemCart: (state, action) => {
      const { id } = action.payload;
      // Find the item in the cart and update its quantity
      const updatedCart = state.cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity !== 1 ? item.quantity - 1 : item.quantity,
            }
          : item
      );
      // Update the state with the new cart items
      return {
        ...state,
        cartItems: updatedCart,
      };
    },
    DeleteFromCart: (state, action) => {
      const { id } = action.payload;
      // Find the item in the cart and update its quantity
      const SingleRecord = state.cartItems.filter((item) => item._id !== id);
      // Update the state with the new cart items
      return {
        ...state,
        cartItems: SingleRecord,
      };
    },
    ShowLoading: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    HideLoading: (state, action) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});
export const {
  updateCart,
  PulsItemCart,
  MinusItemCart,
  DeleteFromCart,
  ShowLoading,
  HideLoading,
} = CounterSlice.actions;
export default CounterSlice.reducer;
