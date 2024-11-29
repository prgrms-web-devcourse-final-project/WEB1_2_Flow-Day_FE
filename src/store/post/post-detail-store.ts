import {create} from 'zustand';

// 장소 데이터 타입
interface ISpot {
  id: number;
  placeId: string;
  name: string;
  city: string;
  comment: string;
  sequence: number;
  courseId: number;
  voteId: string | null;
}

// 이미지 데이터 타입
interface IImage {
  id: number;
  url: string;
  originFileName: string;
  fileSize: number;
  fileExt: string;
}

// 게시글 상세 데이터 타입
interface IPostDetailData {
  id: number;
  nickName: string;
  region: string;
  season: string;
  title: string;
  contents: string;
  tags: string;
  likeCount: number;
  commentCount: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
  spots: ISpot[];
  images: IImage[];
}

// Zustand 스토어 생성
const usePostDetailStore = create<{postDetailData: IPostDetailData; updatePostDetailData: (newData: Partial<IPostDetailData>) => void}>((set) => ({
  postDetailData: {
    id: 1,
    nickName: 'member1',
    region: '서울 경기',
    season: '봄 여름',
    title: '게시글 제목인데요오옹',
    contents: '게시글 내용',
    tags: '#홍대 #서울데이트 #하하하하 #히히히히 #후후후후후후',
    likeCount: 123,
    commentCount: 30,
    courseId: 1,
    createdAt: '2024-11-27T14:47:30.980604',
    updatedAt: '2024-11-27T14:47:30.980604',
    spots: [
      {
        id: 1,
        placeId: 'place1',
        name: '카페',
        city: '서울 종로',
        comment: '코멘트',
        sequence: 1,
        courseId: 1,
        voteId: null,
      },
    ],
    images: [
      {
        id: 1,
        url: 'https://flowday.s3.ap-northeast-2.amazonaws.com/post/2024_11_27/4e0f76ff-61f4-4369-a633-bdf026826b88_Flow%20Day%20%281%29.png',
        originFileName: 'Flow Day (1).png',
        fileSize: 678295,
        fileExt: 'png',
      },
    ],
  },
  // 상태를 업데이트하는 함수 예시
  updatePostDetailData: (newData) =>
    set((state) => ({
      postDetailData: {
        ...state.postDetailData,
        ...newData,
      },
    })),
}));

export default usePostDetailStore;
