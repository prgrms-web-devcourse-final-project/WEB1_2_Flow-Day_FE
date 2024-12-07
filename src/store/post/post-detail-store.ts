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
  region?: string;
  season?: string;
  title: string;
  contents: string;
  tags?: string;
  likeCount: number;
  commentCount: number;
  courseId?: number;
  createdAt: string;
  updatedAt: string;
  spots?: ISpot[];
  images?: IImage[];
}

interface IReply {
  id: number;
  content: string;
  memberName: string | null;
  likeCount: number;
  createdAt: string;
}

// Zustand 스토어 생성
const usePostDetailStore = create<{
  postDetailData: IPostDetailData;
  replyData: IReply[];
  updatePostDetailData: (newData: Partial<IPostDetailData>) => void;
  replaceReply: (updatedReply: IReply) => void;
  setReplyData: (newReplies: IReply[]) => void;
}>((set) => ({
  postDetailData: {
    id: 0,
    nickName: '',
    region: '',
    season: '',
    title: '',
    contents: '',
    tags: '',
    likeCount: 0,
    commentCount: 0,
    courseId: 0,
    createdAt: '2022-12-15T12:15:12.15151',
    updatedAt: '2022-12-15T12:15:12.15151',
    spots: [],
    images: [],
  },

  replyData: [],

  // 게시글 데이터 업데이트 함수
  updatePostDetailData: (newData) =>
    set((state) => ({
      postDetailData: {
        ...state.postDetailData,
        ...newData,
      },
    })),

  // 댓글 교체 함수
  replaceReply: (updatedReply) =>
    set((state) => ({
      replyData: state.replyData.map((reply) => (reply.id === updatedReply.id ? {...reply, ...updatedReply} : reply)),
    })),

  // 댓글 목록을 새로 설정하는 함수
  setReplyData: (newReplies) =>
    set({
      replyData: newReplies,
    }),
}));

export default usePostDetailStore;
