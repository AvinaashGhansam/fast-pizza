import Header from "./Header.tsx";
import CartOverview from "../features/cart/CartOverview.tsx";
import { Outlet, useNavigation } from "react-router-dom";
import "../index.css";
import LoaderUI from "./LoaderUI.tsx";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {
        isLoading && (
          <LoaderUI />
        ) /*This will load the loader if it's in a loading state*/
      }
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto">
          <Outlet />
        </main>
        <CartOverview />
      </div>
    </div>
  );
}
export default AppLayout;
