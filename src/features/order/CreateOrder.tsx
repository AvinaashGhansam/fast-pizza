import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant.ts";

import { OrderType } from "./type/createOrderType.ts";
import Button from "../../components/Button.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../state/createRootState.ts";

interface CartType {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
interface FormDataType {
  customer: string;
  phone: string;
  address: string;
  priority?: boolean;
  cart: CartType;
}
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData() as OrderType;
  const username = useSelector((state: RootState) => state.user.username);

  // const [withPriority, setWithPriority] = useState(false);
  return (
    <div>
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            defaultValue={username}
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && (
              <p className="rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(fakeCart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : "Order Now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

/**
 * Use to write / mutate data
 */
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order: FormDataType = {
    address: "",
    customer: "",
    phone: "",
    ...data,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === "on",
  };
  console.log(order);

  // Validation and error handling
  const errors: Record<string, string> = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please input a correct phone number. We need it to contact you";
  }

  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = (await createOrder(order)) as OrderType;
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
