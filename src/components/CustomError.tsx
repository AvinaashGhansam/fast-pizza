import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

function CustomError() {
  const navigate = useNavigate();
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
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default CustomError;
