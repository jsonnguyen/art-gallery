import sendRequest from './send-request';

const BASE_URL = '/api/galleries';

export async function getAllGalleries() {
    return sendRequest(`${BASE_URL}/all`);
}

export async function getUserGalleries() {
    return sendRequest(`${BASE_URL}/user`);
}

export async function create(galleryData) {
    return sendRequest(BASE_URL, 'POST', galleryData);
}

export async function getGalleryById(id) {
    return sendRequest(`${BASE_URL}/${id}`);
}

export async function deleteGallery(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export async function addArtworkToGallery(id, artworkId) {
    return sendRequest(`${BASE_URL}/${id}/artworks`, 'POST', { artworkId });
}

export async function removeArtworkFromGallery(galleryId, artworkId) {
    return sendRequest(`${BASE_URL}/${galleryId}/artworks/${artworkId}`, 'DELETE');
  }
  
