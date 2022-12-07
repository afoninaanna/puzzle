import Login from "./components/Login/Login";
import Puzzle from "./components/Puzzle";
import { LOGIN_ROUTE, PUZZLE_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    }
]
export const privateRoutes = [
    {
        path: PUZZLE_ROUTE,
        Component: <Puzzle/>
    }
]