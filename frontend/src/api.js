
/*
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const api = axios.create({ baseURL });

// console.log('[API baseURL]', baseURL);
console.log('[API baseURL]', import.meta.env.VITE_API_URL || 'fallback');

export function setAuthToken(token){
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : undefined;
}
export default api;
*/

import axios from 'axios';
const api = axios.create({ baseURL: '/api' }) // proxied to Laravel
export function setAuthToken(t){ api.defaults.headers.common.Authorization = t ? `Bearer ${t}` : undefined }
export default api;
