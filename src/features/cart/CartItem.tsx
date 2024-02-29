import { formatCurrency } from "../../utils/helpers.ts";
import DeleteItem from "./DeleteItem.tsx";
import { CartType } from "./type/createCartType.ts";

interface CartItemProps {
  item: CartType;
}
function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="sm: justify-between py-3 sm:flex sm:items-center">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
