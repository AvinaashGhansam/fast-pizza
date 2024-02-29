import { formatCurrency } from "../../utils/helpers.ts";

import { CartType } from "../cart/type/createCartType.ts";

interface OrderItemProps {
  item: CartType;
  isLoadingIngredients: boolean;
  ingredients: string[];
}
function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="test-sm flex items-center justify-between gap-4">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
