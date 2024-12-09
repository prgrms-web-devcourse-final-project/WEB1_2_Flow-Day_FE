
import apiClient from 'src/utils/apiClient';
import { Course, CreateCourseRequest, PageResponse } from '@/types/course';

const BASE_URL = 'http://flowday.kro.kr:80/api/v1';

export interface WishSpot {
  id: number;
  placeId: string;
  name: string;
  city: string;
  comment: string;
  sequence: number;
  courseId: number;
  voteId: number;
  photoUrl?: string;  
  rating?: string;   
  address?: string;   
}

export interface WishPlacesResponse {
  id: number;
  memberId: number;
  spots: WishSpot[];
  memberName?: string;
}
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
  },


  getCourseById: async (courseId: number): Promise<Course> => {
    try {
      const response = await apiClient.get<Course>(
        `${BASE_URL}/courses/${courseId}`
      );
      return response.data;
    } catch (error) {
      console.error('코스 상세 조회 오류:', error);
      throw error;
    }
  },

  deleteSpot: async (courseId: number, spotId: number): Promise<void> => {
    try {
      await apiClient.delete(`${BASE_URL}/courses/${courseId}/spot/${spotId}`);
    } catch (error) {
      console.error('코스 내 장소 삭제 오류:', error);
      throw error;
    }
  },

  updateSpotSequence: async (courseId: number, spotId: number, sequence: number): Promise<void> => {
    try {
      await apiClient.patch(`${BASE_URL}/courses/${courseId}/spots/${spotId}`, { sequence });
    } catch (error) {
      console.error('코스 내 장소 순서 업데이트 오류:', error);
      throw error;
    }
  },

    // 나의 위시리스트 조회
    getWishPlaces: async (): Promise<WishPlacesResponse> => {
      try {
        const response = await apiClient.get<WishPlacesResponse>(
          `${BASE_URL}/wishPlaces`
        );
        // 응답이 없거나 spots가 없는 경우 빈 배열 반환
        if (!response.data || !response.data.spots) {
          return { id: 0, memberId: 0, spots: [] };
        }
        return response.data;
      } catch (error) {
        console.error('위시리스트 조회 오류:', error);
        throw error;
      }
    },

      // 파트너의 위시플레이스 조회
  getPartnerWishPlaces: async (): Promise<WishPlacesResponse> => {
    try {
      const response = await apiClient.get<WishPlacesResponse>(
        `${BASE_URL}/wishPlaces/partner`
      );
      if (!response.data || !response.data.spots) {
        return { id: 0, memberId: 0, spots: [], memberName: '' };
      }
      return response.data;
    } catch (error) {
      console.error('파트너 위시리스트 조회 오류:', error);
      throw error;
    }
  },
  
    deleteWishPlace: async (spotId: number): Promise<void> => {
      try {
        await apiClient.delete(`${BASE_URL}/wishPlaces/spot/${spotId}`);
      } catch (error) {
        console.error('위시리스트 장소 삭제 오류:', error);
        throw error;
      }
    }


};