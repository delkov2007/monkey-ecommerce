import { Navigate } from "react-router-dom";
import { ROUTHING_PATHS } from "../../common/constants/routing.constants";

const { root } = ROUTHING_PATHS;

const UserRoutesGuard = ({ canActivate, children }) => {
    debugger;
    return canActivate
        ? children
        : <Navigate to={`${root}`} replace />;
};

export default UserRoutesGuard;

