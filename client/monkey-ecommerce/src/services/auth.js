import axios from "axios";

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



const addHeaderToken = (token) => {
    return {
        authtoken: token
    };
};



export { createOrUpdateUser };