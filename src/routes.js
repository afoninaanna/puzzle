import Login from "./components/Login/Login";
import Puzzle from "./components/Puzzle";
import Register from "./components/Register/Register";
import { LOGIN_ROUTE, PUZZLE_ROUTE, REGISTER_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    },
    {
        path: REGISTER_ROUTE,
        Component: <Register/>
    }
]
export const privateRoutes = [
    {
        path: PUZZLE_ROUTE,
        Component: <Puzzle/>
    }
]