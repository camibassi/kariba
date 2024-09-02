import { Outlet } from "react-router-dom";
import MenuPrincipal from "./routes/menuPrincipal";
import Game from "./routes/game";

export default function App()
{
  return (
    <>
      <Outlet />
    </>
  );
}