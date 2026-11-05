import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_URL || 'http://localhost:3003/api'
});

API.interceptors.request.use((req)=>{
    const token = JSON.parse(localStorage.getItem('token'));
    if(token){  
        req.headers.Authorization = `Bearer ${token}`
    }
    return req;
});

export const loginUser = (formData)=> API.post('/login',formData);
export const signupUser = (formData) => API.post('/signup',formData);


export const fetchUserData = ()=> API.get('/protected-data');
export const logout = ()=> API.post('/logout',{},{withCredentials:true});
