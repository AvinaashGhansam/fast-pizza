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
    <li className="space-y-1 py-3">
      <div className="test-sm flex items-center justify-between gap-4">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? "Loading..." : ingredients.join(",")}
      </p>
    </li>
  );
}

export default OrderItem;
