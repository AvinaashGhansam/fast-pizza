import { CartType } from "../../cart/type/createCartType.ts";

export interface OrderType {
  id: string;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: Date;
  cart: CartType[];
  phone?: string;
}
