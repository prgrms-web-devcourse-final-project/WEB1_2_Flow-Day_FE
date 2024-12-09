import {create} from 'zustand';

// IAlert 인터페이스 정의
export interface IAlert {
  id: number | null;
  receiverId: number | null;
  message: string;
  url: string;
  createdAt: string;
  isRead: boolean;
  type: 'LIKE' | 'COMMENT' | 'VOTE' | 'COUPLE' | 'COURSE' | null; // 수정 예정
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
      id: null,
      receiverId: null,
      message: 'Error : No Message',
      url: 'Error : No url',
      createdAt: '2001-09-05T09:05:00',
      isRead: true,
      type: null,
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

const data = [
  {
    additionalParamsJson: '{"relationshipDt":"string","senderId":2}',
    createdAt: '2024-12-08T11:25:38.611007',
    id: 7,
    isRead: false,
    message: '연인 신청이 도착했습니다.',
    receiverId: 5,
    senderId: 2,
    type: null,
    url: '/api/v1/members/partnerUpdate',
  },
  {
    additionalParamsJson: '{"relationshipDt":"string","senderId":2}',
    createdAt: '2024-12-08T11:21:30.933033',
    id: 6,
    isRead: false,
    message: '연인 신청이 도착했습니다.',
    receiverId: 5,
    senderId: 2,
    type: null,
    url: '/api/v1/members/partnerUpdate',
  },
];
