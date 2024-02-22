import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.tsx";
import Username from "../features/user/Username.tsx";

function Header() {
  return (
    <header className=" flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast Pizza
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
export default Header;
