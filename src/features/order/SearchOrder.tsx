import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../../utils/router/route.ts";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query) {
      return;
    }
    navigate(route.VIEW_ORDER.replace(":orderId", query));
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
        w-28 rounded-full px-4 py-2 text-sm
        ring-opacity-50 transition-all duration-300
        placeholder:text-stone-400  focus:outline-none
        focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}
export default SearchOrder;
