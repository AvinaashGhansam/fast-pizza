import React from "react";
import Button from "../../components/Button.tsx";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice.ts";

interface UpdateItemProps {
  pizzaId: number;
  currentQuantity: number;
}
const UpdateItemInCart: React.FC<UpdateItemProps> = ({
  pizzaId,
  currentQuantity,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="gap-2 text-sm font-medium md:gap-2">
        {currentQuantity}
      </span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
};
export default UpdateItemInCart;
