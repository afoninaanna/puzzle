import { Navigate, Route, Routes } from "react-router-dom";
import { LOGIN_ROUTE, USER_SETTINGS_ROUTE, ADMIN_ROUTE } from "../utils/consts";
import { privateRoutes, publicRoutes } from "./../routes";
const AppRouter = ({ user }) => {
    return (
        user?
        (
            <Routes>
                {privateRoutes.map(({path, Component}) => (
                    <Route key={Component} path={path} element={Component}/>
                ))}
                {user.uid=="M2AiQ0FhDqPFgEEPrWx1gvUrgVl1"
                ? <Route path='*' element={<Navigate to={ADMIN_ROUTE} />} />
                : <Route path='*' element={<Navigate to={USER_SETTINGS_ROUTE} />} />
                }
                 
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={Component} path={path} element={Component} />
                ))}
                <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
            </Routes>
        )
    )
}

export default AppRouter