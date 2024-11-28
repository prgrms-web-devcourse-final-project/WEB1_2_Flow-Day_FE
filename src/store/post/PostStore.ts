// // PostStore.ts : 포스트 관련 상태 관리
// import create from 'zustand';

// interface IPost {
//   id: string;
//   writerName: string; // 닉네임
//   city: string; // 카테고리
//   title: string; // 게시글 제목
//   contents: string; // 게시글 내용
//   courseId: number; // 코스 아이디
//   created_at: string; // 생성일자
//   updated_at: string; // 수정일자
//   spots: any[]; // Assuming spots is an array of objects
//   images: any[]; // Assuming images is an array of objects
// }

// interface PostState {
//   posts: IPost[];
//   addPost: (post: IPost) => void;
//   updatePost: (id: string, updatedPost: Partial<IPost>) => void;
//   deletePost: (id: string) => void;
// }

// const usePostStore = create<PostState>(set => ({
//   posts: [],
//   addPost: post => set(state => ({ posts: [...state.posts, post] })),
//   updatePost: (id, updatedPost) =>
//     set(state => ({
//       posts: state.posts.map(post =>
//         post.id === id ? { ...post, ...updatedPost } : post,
//       ),
//     })),
//   deletePost: id =>
//     set(state => ({
//       posts: state.posts.filter(post => post.id !== id),
//     })),
// }));

// export default usePostStore;
