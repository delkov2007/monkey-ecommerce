import { ROUTHING_PATHS } from "../common/constants/routing.constants";
import USER_ROLES from "../common/constants/user-roles.constant";
import httpClient from "./data";

const { user, history, admin, dashboard } = ROUTHING_PATHS;

const createOrUpdateUser = async (token, payload = {}) => {
    const url = `${process.env.REACT_APP_BASE_URL}/create-or-update-user`;
    return await httpClient.post(url, token, payload);
};

const currentUser = async (token, payload = {}) => {
    const url = `${process.env.REACT_APP_BASE_URL}/current-user`;
    return await httpClient.post(url, token, payload);
};

const redirectBaseOnRole = ({ role, navigate, navigationOptions = {} }) => {
    debugger;
    switch (role) {
        case USER_ROLES.admin:
            navigate(`/${admin}/${dashboard}`, navigationOptions);
            break;
        case USER_ROLES.subscriber:
        default:
            navigate(`/${user}/${history}`, navigationOptions);
            break;
    }
};

export { createOrUpdateUser, currentUser, redirectBaseOnRole };