import sendRequest from './send-request';

const BASE_URL = '/api/artworks';

export function createNewArtwork(data) {
    return sendRequest(`${BASE_URL}/new`, 'POST', data);
}