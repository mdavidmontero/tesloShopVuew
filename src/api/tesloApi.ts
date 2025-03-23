import axios from 'axios';
const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_TESLO_API_URL,
});

tesloApi.interceptors.request.use();

export { tesloApi };
