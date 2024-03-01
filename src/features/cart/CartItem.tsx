import { formatCurrency } from "../../utils/helpers.ts";
import DeleteItem from "./DeleteItem.tsx";
import { CartType } from "./type/createCartType.ts";
import UpdateItemInCart from "./UpdateItemInCart.tsx";
import { useSelector } from "react-redux";
import { getQuantityForIndividualItemId } from "./cartSlice.ts";

interface CartItemProps {
  item: CartType;
}
function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getQuantityForIndividualItemId(pizzaId));
  console.log("CartItem: ", item);
  return (
    <li className="sm: justify-between py-3 sm:flex sm:items-center">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemInCart pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
