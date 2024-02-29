import { formatCurrency } from "../../utils/helpers.ts";
import { MenuType } from "./types/menu-types.ts";
import Button from "../../components/Button.tsx";
import { CartType } from "../cart/type/createCartType.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  getCart,
  getQuantityForIndividualItemId,
} from "../cart/cartSlice.ts";
import DeleteItem from "../cart/DeleteItem.tsx";

interface MenuItemProps {
  pizza: MenuType;
}

function MenuItem({ pizza }: MenuItemProps) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getQuantityForIndividualItemId(id));

  const isInCart = currentQuantity > 0;
  function handleAddToCart() {
    // new pizza object
    const newItem: CartType = {
      name: name,
      pizzaId: id,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: 0,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">
          {id} {name}
        </p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && <DeleteItem pizzaId={id} />}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
