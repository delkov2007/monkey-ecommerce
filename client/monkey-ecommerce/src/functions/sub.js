import httpClient from "./data";

const categoryUrl = `${process.env.REACT_APP_BASE_URL}/subs`;

const createSub = async (token, payload) => {
    return await httpClient.post(categoryUrl, token, payload);
};

const getSubList = async (token) => {
    return await httpClient.get(categoryUrl, token);
};

const getSub = async (slug, token) => {
    const url = `${categoryUrl}/${slug}`;
    return await httpClient.get(url, token);
};

const updateSub = async (slug, token, payload) => {
    const url = `${categoryUrl}/${slug}`;
    return await httpClient.put(url, token, payload);
};

const deleteSub = async (slug, token) => {
    const url = `${categoryUrl}/${slug}`;
    return await httpClient.remove(url, token);
};

export { createSub, getSubList, getSub, updateSub, deleteSub };