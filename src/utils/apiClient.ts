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
