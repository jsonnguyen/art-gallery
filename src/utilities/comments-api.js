import sendRequest from './send-request';

const BASE_URL = '/api/comments';

export function deleteComment(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
