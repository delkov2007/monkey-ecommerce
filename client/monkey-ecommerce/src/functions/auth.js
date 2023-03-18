import axios from "axios";
import { ROUTHING_PATHS } from "../common/constants/routing.constants";
import USER_ROLES from "../common/constants/user-roles.constant";

const { user, history, admin, dashboard } = ROUTHING_PATHS;

const createOrUpdateUser = async (token, payload = {}) => {
    const url = `${process.env.REACT_APP_BASE_URL}/create-or-update-user`;
    return await axios.post(
        url,
        payload,
        {
            headers: addHeaderToken(token)
        }
    );
};

const currentUser = async (token, payload = {}) => {
    const url = `${process.env.REACT_APP_BASE_URL}/current-user`;
    return await axios.post(
        url,
        payload,
        {
            headers: addHeaderToken(token)
        }
    );
};

const redirectBaseOnRole = ({ role, navigate }) => {
    switch (role) {
        case USER_ROLES.admin:
            navigate(`/${admin}/${dashboard}`);
            break;
        case USER_ROLES.subscriber:
        default:
            navigate(`/${user}/${history}`);
            break;
    }
};

const addHeaderToken = (token) => {
    return {
        authtoken: token
    };
};

export { createOrUpdateUser, currentUser, redirectBaseOnRole };