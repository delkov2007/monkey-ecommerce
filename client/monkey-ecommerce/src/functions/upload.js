import httpClient from "./data";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const upload = async (token, payload) => {
    return await httpClient.post(`${baseUrl}/upload-images`, token, payload);
};

const remove = async (token, payload) => {
    return await httpClient.post(`${baseUrl}/remove-image`, token, payload);
};

export { upload, remove };