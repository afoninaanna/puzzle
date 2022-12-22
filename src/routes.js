import Login from "./components/Login/Login";
import Puzzle from "./components/Puzzle/Puzzle";
import Register from "./components/Register/Register";
import UserSettings from "./components/UserSettings/UserSettings";
import Admin from "./components/Admin/Admin"
import Developers from "./components/Info/Developers";
import Help from "./components/Info/Help";
import { LOGIN_ROUTE, PUZZLE_ROUTE, REGISTER_ROUTE, USER_SETTINGS_ROUTE, ADMIN_ROUTE, DEVELOPERS_ROUTE, HELP_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    },
    {
        path: REGISTER_ROUTE,
        Component: <Register/>
    },
    {
        path: DEVELOPERS_ROUTE,
        Component: <Developers/>
    },
    {
        path: HELP_ROUTE,
        Component: <Help/>
    }
]
export const privateRoutes = [
    {
        path: PUZZLE_ROUTE,
        Component: <Puzzle/>
    },
    {
        path: USER_SETTINGS_ROUTE,
        Component: <UserSettings/>
    },
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    }
]