import httpClient from "./data";

const categoryUrl = `${process.env.REACT_APP_BASE_URL}/categories`;

const createCategory = async (token, payload) => {
    return await httpClient.post(categoryUrl, token, payload);
};

const getCategoryList = async (token) => {
    return await httpClient.get(categoryUrl, token);
};

const getCategory = async (slug, token) => {
    const url = `${categoryUrl}/${slug}`;
    return await httpClient.get(url, token);
};

const updateCategory = async (slug, token, payload) => {
    const url = `${categoryUrl}/${slug}`;
    return await httpClient.put(url, token, payload);
};

const deleteCategory = async (slug, token) => {
    const url = `${categoryUrl}/${slug}`;
    return await httpClient.remove(url, token);
};

export { createCategory, getCategoryList, getCategory, updateCategory, deleteCategory };