import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTHING_PATHS } from "../../common/constants/routing.constants";
import Spinner from "../Spinner";

const {
    unauthorized,
    login
} = ROUTHING_PATHS;

const RequireAuth = ({ allowedRoles }) => {
    const user = useSelector(state => ({ ...state.user }));
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user.isAuthenticated)
            setIsLoading(false);
    }, [user]);

    if (isLoading)
        return <Spinner />;

    const isAuthenticated = user.isAuthenticated;
    const isInAllowedRole = allowedRoles.find(x => x === user.role);

    return !!isInAllowedRole
        ? <Outlet />
        : isAuthenticated
            ? <Navigate to={`/${unauthorized}`} state={{ from: location }} replace />
            : <Navigate to={`/${login}`} state={{ from: location }} replace />;
};

export default RequireAuth;

