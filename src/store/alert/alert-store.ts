import {create} from 'zustand';

// IAlert 인터페이스 정의
interface IAlert {
  id: number;
  receiverId: number;
  message: string;
  url: string;
  createdAt: string;
  isRead: boolean;
  type: 'LIKE' | 'COMMENT' | 'VOTE' | 'COUPLE' | 'COURSE'; // 수정 예정
}

const useAlertStore = create<{alerts: IAlert[]; addAlert: (alert: IAlert) => void; markAsRead: (id: number) => void}>((set) => ({
  alerts: [
    {
      id: 1,
      receiverId: 1,
      message: '새로운 댓글이 달렸습니다!',
      url: 'http://localhost:8080/posts/123',
      createdAt: '2024-11-29T12:34:56',
      isRead: true,
      type: 'COMMENT',
    },
    {
      id: 2,
      receiverId: 2,
      message: '새로운 댓글이 달렸습니다!',
      url: 'http://localhost:8080/posts/456',
      createdAt: '2024-11-30T12:34:56',
      isRead: false,
      type: 'COMMENT',
    },
    {
      id: 3,
      receiverId: 3,
      message: '새로운 댓글이 달렸습니다!',
      url: 'http://localhost:8080/posts/789',
      createdAt: '2024-12-29T12:34:56',
      isRead: false,
      type: 'COMMENT',
    },
  ],
  addAlert: (alert) => set((state) => ({alerts: [...state.alerts, alert]})),
  markAsRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map((alert) => (alert.id === id ? {...alert, isRead: true} : alert)),
    })),
}));

export default useAlertStore;
