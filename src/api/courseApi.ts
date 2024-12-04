import axios from 'axios';
import { Course, CreateCourseRequest, PageResponse } from '@/types/course';

const BASE_URL = 'http://flowday.kro.kr:80/api/v1';

export const decodeToken = (token: string) => {
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
  },

    updateCourse: async (courseId: number, courseData: CreateCourseRequest, token: string): Promise<Course> => {
      try {
        const tokenInfo = decodeToken(token);
        if (tokenInfo?.isExpired) {
          throw new Error('토큰이 만료되었습니다. 다시 로그인해주세요.');
        }
  
        const response = await axios.put<Course>(
          `${BASE_URL}/courses/${courseId}`,
          courseData,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json'
            }
          }
        );
  
        return response.data;
      } catch (error) {
        console.error('코스 수정 오류:', error);
        if (axios.isAxiosError(error)) {
          console.error('Error Status:', error.response?.status);
          console.error('Error Data:', error.response?.data);
        }
        throw error;
      }
    },
  
    deleteCourse: async (courseId: number, token: string): Promise<void> => {
      try {
        // 토큰 유효성 검사
        const tokenInfo = decodeToken(token);
        if (!tokenInfo || tokenInfo.isExpired) {
          throw new Error('유효하지 않은 토큰입니다. 다시 로그인해주세요.');
        }
  
        console.log(`=== 코스 ${courseId} 삭제 요청 시작 ===`);
        const response = await axios({
          method: 'DELETE',
          url: `${BASE_URL}/courses/${courseId}`,
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          maxRedirects: 0,
          validateStatus: (status) => {
            return status >= 200 && status < 300;
          }
        });
  
        // 응답 상태 코드 로깅
        console.log('삭제 응답 상태 코드:', response.status);
        console.log('응답이', response.status === 204 ? 'No Content(204)' : 'OK(200)');
  
        // HTML 응답 체크
        const contentType = response.headers['content-type'];
        if (contentType?.toLowerCase().includes('text/html')) {
          console.error('HTML 응답 수신 - 상태 코드:', response.status);
          throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
        }
  
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          console.error('에러 상태 코드:', status);
          
          if (status === 401) {
            throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
          }
          if (status === 403) {
            throw new Error('이 코스를 삭제할 권한이 없습니다.');
          }
        }
        throw error;
      }
  }
};