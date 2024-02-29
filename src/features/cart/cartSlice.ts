import { CartState } from "../../state/createCartState.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "./type/createCartType.ts";
import { RootState } from "../../state/createRootState.ts";

const initialState: CartState = {
  // cart: [
  //   {
  //     name: "Mediterranean",
  //     pizzaId: 12,
  //     quantity: 1,
  //     totalPrice: 32,
  //     unitPrice: 16,
  //   },
  // ],
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state: CartState, action: PayloadAction<CartType>) {
      state.cart.push(action.payload);
    },
    deleteItem(state: CartState, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state: CartState, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item !== undefined) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state: CartState, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item !== undefined) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state: CartState) {
      state.cart = [];
    },
  },
});

// REDUX RECOMMENDS TO COMPUTE THESE VALUES HERE
// INVESTIGATE "reselect" LIBRARY FOR PERFORMANCE OPTIMIZATION
export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state: RootState) => state.cart.cart;

export const getQuantityForIndividualItemId =
  (id: number) => (state: RootState) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
