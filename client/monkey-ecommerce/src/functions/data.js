import axios from "axios";

const post = async (url, token, payload) => {
    return await axios.post(
        url,
        payload,
        {
            headers: addHeaderToken(token)
        }
    ).catch(handleError);
};

const get = async (url, token) => {
    return axios.get(
        url,
        {
            headers: addHeaderToken(token)
        }
    ).catch(handleError);
};

const put = async (url, token, payload) => {
    return axios.put(
        url,
        payload,
        {
            headers: addHeaderToken(token)
        }
    ).catch(handleError);
};

const remove = async (url, token) => {
    return axios.delete(
        url,
        {
            headers: addHeaderToken(token)
        }
    ).catch(handleError);
};

const httpClient = {
    post,
    put,
    get,
    remove
};


const handleError = (error) => {
    console.log(`Error --> ${error}`);
    throw new Error(error);
};


const addHeaderToken = (token) => {
    return {
        authtoken: token
    };
};

export default httpClient;