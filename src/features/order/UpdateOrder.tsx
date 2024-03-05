import { OrderType } from "./type/createOrderType.ts";
import Button from "../../components/Button.tsx";
import { Params, useFetcher } from "react-router-dom";
import React from "react";
import { updateOrder } from "../../services/apiRestaurant.ts";

interface OrderTypeProp {
  order: OrderType;
}
const UpdateOrder: React.FC<OrderTypeProp> = () => {
  const fetcher = useFetcher();
  // fetcher.Form will not navigate away
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
};

interface ActionProp {
  params: Params<"orderId">;
}
// This is revalidation
export async function action({ params }: ActionProp) {
  const data = { priority: true };
  await updateOrder(params.orderId!, data);
  return null;
}
export default UpdateOrder;
