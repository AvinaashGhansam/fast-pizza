import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.tsx";

function Header() {
  return (
    <header>
      <Link to="/">Fast Pizza</Link>
      <SearchOrder />
    </header>
  );
}
export default Header;
