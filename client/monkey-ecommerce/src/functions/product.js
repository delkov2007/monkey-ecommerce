import httpClient from "./data";

const productUrl = `${process.env.REACT_APP_BASE_URL}/products`;

const createProduct = async (token, payload) => {
    return await httpClient.post(productUrl, token, payload);
};

const getProductList = async (token) => {
    return await httpClient.get(productUrl, token);
};

const getProductListByCount = async (token, count) => {
    return await httpClient.get(`${productUrl}/${count}`, token);
};

const getProduct = async (slug, token) => {
    const url = `${productUrl}/${slug}`;
    return await httpClient.get(url, token);
};

const updateProduct = async (slug, token, payload) => {
    const url = `${productUrl}/${slug}`;
    return await httpClient.put(url, token, payload);
};

const deleteProduct = async (slug, token) => {
    const url = `${productUrl}/${slug}`;
    return await httpClient.remove(url, token);
};

export { createProduct, getProductList, getProductListByCount, getProduct, updateProduct, deleteProduct };