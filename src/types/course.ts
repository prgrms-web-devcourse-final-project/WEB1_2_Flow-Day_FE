export interface Course {
  id: number;
  memberId: number;
  title: string;
  status: 'PRIVATE' | 'PUBLIC' | 'COUPLE';  
  date: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
  spots?: Array<{
    id: number;
    placeId: string;
    name: string;
    city: string;
    comment: string;
    sequence: number;
    courseId: number;
    voteId: number;
  }>;
}

export interface CreateCourseRequest {
  title: string;
  status: 'PRIVATE' | 'PUBLIC' | 'COUPLE';
  date: string;
  color: string;
}

export interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface Pageable {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sort[];
  unpaged: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  size: number;
  number: number;
  sort: Sort[];
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}