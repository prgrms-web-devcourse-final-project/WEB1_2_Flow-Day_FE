import {create} from 'zustand';
import * as ImagePicker from 'expo-image-picker';

interface IPostEditData {
  title: string;
  tags: string;
  region: string;
  season: string;
  courseId: number;
  contents: string;
  status: 'PUBLIC' | 'COUPLE' | 'PRIVATE';
  images: ImagePicker.ImagePickerAsset[];
}

interface ISpot {
  id: number;
  placeId: string;
  name: string;
  city: string;
  comment: string;
  sequence: number;
  courseId: string;
  voteId: number | null;
}

interface ICourse {
  id: number;
  memberId: number;
  title?: string;
  status?: string;
  date?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
  spots: ISpot[];
}

interface IContent {
  content: ICourse[];
  pageable?: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last?: boolean;
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  size?: number;
  number?: number;
  sort?: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements?: number;
  empty?: boolean;
}

interface IPostEdit {
  postEditData: IPostEditData;
  postList: IContent;
  setPostEditData: (newData: IPostEditData) => void;
  setPostList: (newData: IContent) => void;
}

const usePostEditStore = create<IPostEdit>((set) => ({
  postEditData: {
    title: '', // Edit the title
    tags: '', // Edit relevant tags
    region: '', // Edit the region
    season: '', // Edit the season
    courseId: 0, // Edit the course ID
    contents: '', // Edit the content
    status: 'PUBLIC',
    images: [],
  },
  postList: {
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 10,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      offset: 0,
      unpaged: true,
      paged: false,
    },
    last: false,
    totalPages: 0,
    totalElements: 0,
    first: true,
    size: 0,
    number: 0,
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
    numberOfElements: 0,
    empty: true,
  },
  setPostEditData: (newData: IPostEditData) =>
    set((state) => ({
      postEditData: {...state.postEditData, ...newData},
    })),
  setPostList: (newData: IContent) =>
    set((state) => ({
      postList: {...state.postList, ...newData},
    })),
}));

export default usePostEditStore;
