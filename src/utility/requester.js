import { userUtil } from "./userUtil.js";


const host = 'http://localhost:3030';

async function requester(method, url, data) {
    const option = {
        method,
        headers: {}
    }

    if (data != undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    const userData = userUtil.getUserData();

    if (userData) {
        option.headers['X-Authorization'] = userData.token;
    }

    try {
        const response = await fetch(host + url, option);

        if (!response.ok) {
            const error = await response.json();

            if (response.status == 403) {
                userUtil.clearUserData();
            }

            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return response.json();

    } catch (error) {
        throw error;
    }
}

async function get(url) {
    return requester('GET', url);
}

async function post(url, data) {
    return requester('POST', url, data)
}

async function put(url, data) {
    return requester('PUT', url, data);
}

async function del(url) {
    return requester('DELETE', url);
}

export const api = {
    get,
    post,
    put,
    del
}