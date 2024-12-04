import { REACT_APP_SERVER_URL } from '@env';
import axios from 'axios';

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await axios.post(`${REACT_APP_SERVER_URL}/members/refresh`, {
      token: refreshToken
    });
    return response.data;
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    throw error;
  }
};
