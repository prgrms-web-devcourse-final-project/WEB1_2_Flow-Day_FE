import axios from 'axios';
import { useStore } from '@/store/useStore';
import { REACT_APP_SERVER_URL } from '@env';

const apiClient = axios.create({
  baseURL: REACT_APP_SERVER_URL
});

apiClient.interceptors.request.use((config) => {
  const { accessToken } = useStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImNhdGVnb3J5IjoiYWNjZXNzVG9rZW4iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWQiOjE2LCJsb2dpbklkIjoidGVzdGVyIn0sImlhdCI6MTczMzM2NDM5NywiZXhwIjoxNzY5MzY0Mzk3fQ.7HD2TzWVoImj28ntr-__kxFe0wuzYfudN4PIkVVjXW4`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
        console.log('토큰만료');
      const { refreshAccessToken, logOut } = useStore.getState();
      try {
        await refreshAccessToken();

        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${useStore.getState().accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        logOut();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
