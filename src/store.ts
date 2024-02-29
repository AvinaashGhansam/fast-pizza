import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.ts";
import cartReducer from "./features/cart/cartSlice.ts";

const Store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default Store;
