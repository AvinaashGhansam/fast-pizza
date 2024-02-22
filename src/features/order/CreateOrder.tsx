import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant.ts";

import { OrderType } from "./type/OrderType.ts";
import Button from "../../components/Button.tsx";

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

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input className="input" type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
            {formError?.phone && <p>{formError.phone}</p>}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button isDisabled={isSubmitting}>
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
  const data: Record<string, string> = {};
  // Iterate over formData entries and convert them to strings
  for (const [key, value] of formData.entries()) {
    // Check if the value is a File object, if so, skip it or handle it accordingly
    if (value instanceof File) {
      // Handle File value, if needed
      continue;
    }
    data[key] = value.toString();
  }
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  console.log(order);
  // Validation and error handling
  const errors: Record<string, string> = {};

  if (!isValidPhone(order.cart.phone)) {
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
