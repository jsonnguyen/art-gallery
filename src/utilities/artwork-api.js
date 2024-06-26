import sendRequest from './send-request';

const BASE_URL = '/api/artworks';

export function getAllArtworks(userId = '') {
    const url = userId ? `${BASE_URL}?userId=${userId}` : BASE_URL;
    return sendRequest(url);
}

export function createNewArtwork(data) {
    return sendRequest(`${BASE_URL}/new`, 'POST', data);
}

export function getArtworkById(id) {
    return sendRequest(`${BASE_URL}/${id}`);
}

export function addComment(id, commentData) {
    return sendRequest(`${BASE_URL}/${id}/comments`, 'POST', commentData);
}

export function deleteArtwork(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}