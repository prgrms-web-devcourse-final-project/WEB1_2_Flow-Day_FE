import axios from 'axios';
import { Course, CreateCourseRequest, PageResponse } from '@/types/course';

const BASE_URL = 'http://flowday.kro.kr:5000/api/v1';

const decodeToken = (token: string) => {
  try {
    const actualToken = (token as string).replace('Bearer ', '');
    const payload = JSON.parse(atob(actualToken.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);
    const isExpired = Date.now() > payload.exp * 1000;
    
    console.log('=== Token Info ===');
    console.log('Expires At:', expDate.toLocaleString());
    console.log('Is Expired:', isExpired);

    return { payload, isExpired };
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
};

export const courseApi = {
  createCourse: async (memberId: number, courseData: CreateCourseRequest, token: string): Promise<Course> => {
    try {
      const tokenInfo = decodeToken(token);
      if (tokenInfo?.isExpired) {
        throw new Error('토큰이 만료되었습니다. 다시 로그인해주세요.');
      }

      console.log('=== 코스 생성 요청 ===');
      console.log('Request Headers:', {
        Authorization: token,
        'Content-Type': 'application/json'
      });
      console.log('Request Data:', { memberId, ...courseData });

      const response = await axios.post<Course>(
        `${BASE_URL}/courses`,
        { memberId, ...courseData },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('=== 코스 생성 응답 ===');
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      return response.data;
    } catch (error) {
      console.error('코스 생성 오류:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error Status:', error.response?.status);
        console.error('Error Data:', error.response?.data);
      }
      throw error;
    }
  },
  getCourses: async (token: string): Promise<PageResponse<Course>> => {
    try {
      const tokenInfo = decodeToken(token);
      const memberId = tokenInfo?.payload.data.id;

      if (!memberId) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      const response = await axios.get<PageResponse<Course>>(
        `${BASE_URL}/courses/member/${memberId}`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
        }
      }
      throw error;
    }
  }
};