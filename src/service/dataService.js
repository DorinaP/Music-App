import { api } from '../utility/requester.js';

const endPoints = {
    getAllAlbums: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    createAlbum: '/data/albums',
    apiById: '/data/albums/',
    searchAlbums: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`
}

async function getAllAlbums() {
    return await api.get(endPoints.getAllAlbums);
}

async function createAlbum(data) {
    return await api.post(endPoints.createAlbum, data);
}

async function albumDetails(id) {
    return await api.get(endPoints.apiById + id);
}

async function updateAlbum(id, data) {
    return await api.put(endPoints.apiById + id, data);
}

async function deleteAlbum(id) {
    return await api.del(endPoints.apiById + id);
}

export async function searchAlbums(query) {
    return await api.get(endPoints.searchAlbums(query));
}

export const dataService = {
    getAllAlbums,
    createAlbum,
    albumDetails,
    updateAlbum,
    deleteAlbum,
    searchAlbums
}