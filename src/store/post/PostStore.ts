// PostStore.ts : 포스트 관련 상태 관리
// 아래 코드는 예시로 만들어둔 코드이니 전부 삭제 후 코딩하시기 바랍니다.
import { create } from 'zustand';

// Post 타입 정의
interface Post {
  id: string;
  title: string;
  content: string;
}

// Store의 상태와 액션 정의
interface PostStore {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (updatedPost: Post) => void;
  deletePost: (id: string) => void;
}

// zustand store 생성
export const usePostStore = create<PostStore>(set => ({
  posts: [],

  // 포스트 추가
  addPost: post =>
    set(state => ({
      posts: [...state.posts, post],
    })),

  // 포스트 업데이트
  updatePost: updatedPost =>
    set(state => ({
      posts: state.posts.map(post =>
        post.id === updatedPost.id ? updatedPost : post,
      ),
    })),

  // 포스트 삭제
  deletePost: id =>
    set(state => ({
      posts: state.posts.filter(post => post.id !== id),
    })),
}));
