import { Navigate, Route, Routes } from "react-router-dom";
import { LOGIN_ROUTE, PUZZLE_ROUTE } from "../utils/consts";
import { privateRoutes, publicRoutes } from "./../routes";
const AppRouter = ({ user }) => {
    return (
        user?
        (
            <Routes>
                {privateRoutes.map(({path, Component}) => (
                    <Route path={path} element={Component}/>
                ))}
                <Route path='*' element={<Navigate to={PUZZLE_ROUTE}/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(({ path, Component }) => (
                    <Route path={path} element={Component} />
                ))}
                <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
            </Routes>
        )
    )
}

export default AppRouter