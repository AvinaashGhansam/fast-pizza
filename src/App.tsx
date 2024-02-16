import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home.tsx";
import Menu from "./features/menu/Menu.tsx";
import Cart from "./features/cart/Cart.tsx";
import CreateOrder from "./features/order/CreateOrder.tsx";
import Order from "./features/order/Order.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order/new",
    element: <CreateOrder />,
  },
  {
    path: "/order/:orderId",
    element: <Order />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
