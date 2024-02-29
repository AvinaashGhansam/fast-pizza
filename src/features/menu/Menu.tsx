import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem.tsx";
import { MenuType } from "./types/menu-types.ts";
import { getMenu } from "../../services/apiRestaurant.ts";

function Menu() {
  // Step 3 use loader hook
  const menus = useLoaderData() as MenuType[];
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menus.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  // Step 1
  return await getMenu();
}

export default Menu;
