import React, { useState } from "react";
import Button from "../../components/Button.tsx";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice.ts";
import { useNavigate } from "react-router-dom";
import { route } from "../../utils/router/route.ts";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username) {
      return;
    }

    dispatch(updateName(username));
    // navigate to the pizza menu after the user update their name
    navigate(`${route.MENU}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-8 w-72"
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
