import {create} from 'zustand';

// IAlert 인터페이스 정의
export interface IAlert {
  id: number;
  receiverId: number;
  message: string;
  url: string;
  createdAt: string;
  isRead: boolean;
  type: 'LIKE' | 'COMMENT' | 'VOTE' | 'COUPLE' | 'COURSE'; // 수정 예정
  additionalParamsJson?: string;
}

const useAlertStore = create<{
  alertList: IAlert[];
  addAlert: (alert: IAlert) => void;
  setAlertList: (alerts: IAlert[]) => void; // 새로운 배열을 받아오는 함수 추가
  markAsRead: (id: number) => void;
}>((set) => ({
  alertList: [
    {
      id: 1,
      receiverId: 1,
      message: '새로운 댓글이 달렸습니다!',
      url: 'http://localhost:8080/posts/123',
      createdAt: '2024-11-29T12:34:56',
      isRead: true,
      type: 'COMMENT',
    },
  ],
  addAlert: (alert) => set((state) => ({alertList: [...state.alertList, alert]})),
  setAlertList: (alerts) => set({alertList: alerts}), // 새로운 배열을 상태로 설정
  markAsRead: (id) =>
    set((state) => ({
      alertList: state.alertList.map((alert) => (alert.id === id ? {...alert, isRead: true} : alert)),
    })),
}));

export default useAlertStore;

// const data = {
//   content: [
//     {
//       additionalParamsJson: '{"relationshipDt":"string","senderId":2}',
//       createdAt: '2024-12-08T11:25:38.611007',
//       id: 7,
//       isRead: false,
//       message: '연인 신청이 도착했습니다.',
//       receiverId: 5,
//       senderId: 2,
//       url: '/api/v1/members/partnerUpdate',
//     },
//     {
//       additionalParamsJson: '{"relationshipDt":"string","senderId":2}',
//       createdAt: '2024-12-08T11:21:30.933033',
//       id: 6,
//       isRead: false,
//       message: '연인 신청이 도착했습니다.',
//       receiverId: 5,
//       senderId: 2,
//       url: '/api/v1/members/partnerUpdate',
//     },
//   ],
//   empty: false,
//   first: true,
//   last: true,
//   number: 0,
//   numberOfElements: 2,
//   pageable: {offset: 0, pageNumber: 0, pageSize: 10, paged: true, sort: {empty: true, sorted: false, unsorted: true}, unpaged: false},
//   size: 10,
//   sort: {empty: true, sorted: false, unsorted: true},
//   totalElements: 2,
//   totalPages: 1,
// };
