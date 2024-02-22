import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton.tsx";

function CustomError() {
  const error = useRouteError();
  let errorMsg = "";

  if (isRouteErrorResponse(error)) {
    errorMsg = error.data;
  } else if (error instanceof Error) {
    errorMsg = error.message;
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMsg}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default CustomError;
