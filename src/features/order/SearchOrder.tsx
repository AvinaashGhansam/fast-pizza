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
      />
    </form>
  );
}
export default SearchOrder;
