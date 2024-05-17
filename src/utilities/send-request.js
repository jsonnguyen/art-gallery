import { getToken } from "./users-service";

export default async function sendRequest(url, method = 'GET', payload = null) {
    const options = { method };

    if (payload) {
        // If payload is an instance of FormData, do not stringify and do not set Content-Type
        if (payload instanceof FormData) {
            options.body = payload;
        } else {
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(payload);
        }
    }

    const token = getToken();
    if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, options);
    if (res.ok) return res.json();
    throw new Error('Bad Request');
}
