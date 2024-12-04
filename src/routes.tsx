import { ReactElement } from "react";
import App from "./App";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { GameBoard } from "./pages/game/Game";

export const routes = [
  {
    path: "/",
    element: (<App />) as ReactElement,
  },
  {
    path: "/login",
    element: (<Login />) as ReactElement,
  },
  {
    path: "/register",
    element: (<Register />) as ReactElement,
  },
  {
    path: "/game",
    element: (<GameBoard />) as ReactElement,
  },
];
