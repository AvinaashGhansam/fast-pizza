import React from "react";
import Button from "../../components/Button.tsx";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice.ts";

interface DeleteItemProp {
  pizzaId: number;
}
const DeleteItem: React.FC<DeleteItemProp> = ({ pizzaId }) => {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
