import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:4000'})

API.interceptors.request.use((req)=>{
    const token = JSON.parse(localStorage.getItem('profile'))?.token;
    if (token) {
        req.headers.Authorization = `bearer ${token}`
    }
    return req
})

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const sineUpApi = (formData) => API.post(`/auth/sineUp`,formData);
export const loginApi = (formData) => API.post(`/auth/login`,formData);
