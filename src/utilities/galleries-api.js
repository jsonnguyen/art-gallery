import sendRequest from './send-request';

const BASE_URL = '/api/galleries';

export async function getAll() {
    return sendRequest(BASE_URL);
}

export async function create(galleryData) {
    return sendRequest(BASE_URL, 'POST', galleryData);
}

export async function getGalleryById(id) {
    return sendRequest(`${BASE_URL}/${id}`);
}