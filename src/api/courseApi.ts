
import apiClient from 'src/utils/apiClient';
import { Course, CreateCourseRequest, PageResponse } from '@/types/course';

const BASE_URL = 'http://flowday.kro.kr:80/api/v1';

export const courseApi = {
  createCourse: async (courseData: CreateCourseRequest): Promise<Course> => {
    try {
      const response = await apiClient.post<Course>(
        `${BASE_URL}/courses`,
        courseData 
      );
      return response.data;
    } catch (error) {
      console.error('코스 생성 오류:', error);
      throw error;
    }
  },

  getCourses: async (): Promise<PageResponse<Course>> => {
    try {
      const response = await apiClient.get<PageResponse<Course>>(
        `${BASE_URL}/courses`
      );
      return response.data;
    } catch (error) {
      console.error('코스 목록 조회 오류:', error);
      throw error;
    }
  },

  updateCourse: async (courseId: number, courseData: CreateCourseRequest): Promise<Course> => {
    try {
      const response = await apiClient.put<Course>(
        `${BASE_URL}/courses/${courseId}`,
        courseData
      );
      return response.data;
    } catch (error) {
      console.error('코스 수정 오류:', error);
      throw error;
    }
  },

  deleteCourse: async (courseId: number): Promise<void> => {
    try {
      await apiClient.delete(`${BASE_URL}/courses/${courseId}`);
    } catch (error) {
      console.error('코스 삭제 오류:', error);
      throw error;
    }
  }
};