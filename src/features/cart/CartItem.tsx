import { formatCurrency } from "../../utils/helpers.ts";
import Button from "../../components/Button.tsx";

interface CartItemProps {
  item: {
    name: string;
    quantity: number;
    totalPrice: number;
  };
}
function CartItem({ item }: CartItemProps) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="sm: justify-between py-3 sm:flex sm:items-center">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
