import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AuthContext from "../contexts/AuthContext.jsx";

function MiddlewareRoutes() {
    const { sessione } = useContext(AuthContext);
    const location = useLocation();
    /*if (!sessione) {
        return <Navigate to="/login" replace state={{ path: location.pathname }} />;
    }*/
    return <Outlet />;
}

export default MiddlewareRoutes;
