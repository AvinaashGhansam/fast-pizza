import { UserState } from "../features/user/userType/createUser.ts";
import { CartState } from "./createCartState.ts";

export interface RootState {
  user: UserState;
  cart: CartState;
}
