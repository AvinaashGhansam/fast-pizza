import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout.tsx";
import Home from "./components/Home.tsx";
import Cart from "./features/cart/Cart.tsx";
import CreateOrder, {
  action as orderAction,
} from "./features/order/CreateOrder.tsx";
import Order, { loader as orderLoader } from "./features/order/Order.tsx";
import { route } from "./utils/router/route.ts";
import Menu, { loader as menuLoader } from "./features/menu/Menu.tsx";
import CustomError from "./components/CustomError.tsx";
import { action as updateOrderAction } from "./features/order/UpdateOrder.tsx";

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <CustomError />,
    children: [
      {
        path: route.HOME,
        element: <Home />,
      },
      {
        path: route.MENU,
        element: <Menu />,
        loader: menuLoader /*Step 2*/,
        errorElement: <CustomError />,
      },
      {
        path: route.CART,
        element: <Cart />,
      },
      {
        path: route.ORDER,
        element: <CreateOrder />,
        action: orderAction,
      },
      {
        path: route.VIEW_ORDER,
        element: <Order />,
        loader: orderLoader,
        errorElement: <CustomError />,
        action: updateOrderAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
