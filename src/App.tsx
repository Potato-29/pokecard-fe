import { useNavigate } from "react-router-dom";
import Button from "./components/Button/Button";
import "./App.css";

function App() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="">
        <h1 className="text-3xl font-bold">
          This is our game, to experience it, please register or login.
        </h1>
      </div>
      <div className="flex flex-row my-3">
        <Button
          className="py-2 px-3 mx-2"
          onClick={() => navigate("/login")}
          variant="primary"
        >
          Login
        </Button>
        <Button
          className="py-2 px-3 mx-2"
          onClick={() => navigate("/register")}
          variant="secondary"
        >
          Register
        </Button>
        <Button
          className="py-2 px-3 mx-2"
          onClick={() => navigate("/game")}
          variant="primary"
        >
          Game
        </Button>
      </div>
    </div>
  );
}

export default App;
