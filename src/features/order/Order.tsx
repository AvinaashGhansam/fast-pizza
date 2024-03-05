// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant.ts";
import { Params, useFetcher, useLoaderData } from "react-router-dom";
import { OrderType } from "./type/createOrderType.ts";
import OrderItem from "./OrderItem.tsx";
import { useEffect } from "react";
import { route } from "../../utils/router/route.ts";
import UpdateOrder from "./UpdateOrder.tsx";

function Order() {
  // get the data from loader
  const order = useLoaderData() as OrderType;
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load(route.MENU);
    }
    // This will load the data in the fetcher so we can use it later on
  }, [fetcher]);
  console.log(fetcher.data);
  // Everyone can search for all orders, so for privacy reasons we're exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  console.log("priority", priority);
  console.log(order);
  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-green-50">
            {" "}
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find(
                (el: OrderType) => parseInt(el.id) === item.pizzaId,
              ).ingredients ?? []
            }
          />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority ? <UpdateOrder order={order} /> : ""}
    </div>
  );
}

// It's a convention to place it here
export async function loader({ params }: { params: Params<"orderId"> }) {
  return await getOrder(params.orderId!);
}

export default Order;
