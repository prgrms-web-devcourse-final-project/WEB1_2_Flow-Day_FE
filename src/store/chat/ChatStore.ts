import { create } from 'zustand';

interface IChatData {
  senderId: number;
  message: string;
  time: string;
  pageNumber: number; // 현재 페이지
  totalPages: number; // 총 페이지 수
}

interface ChatState {
  chatData: IChatData[];
  addMessage: (message: IChatData) => void;
}

const useChatStore = create<ChatState>(set => ({
  chatData: [
    {
      senderId: 1,
      message: '동해물과',
      time: '2024-12-02T10:52:32.737144',
      pageNumber: 0,
      totalPages: 1,
    },
    {
      senderId: 2,
      message: '백두산이백두산이백두산이',
      time: '2024-12-02T10:53:28.104461',
      pageNumber: 0,
      totalPages: 1,
    },
    {
      senderId: 1,
      message: '마르고마르고마르고마르고마르고',
      time: '2024-12-02T10:54:32.737144',
      pageNumber: 0,
      totalPages: 1,
    },
    {
      senderId: 2,
      message: '닳도록닳도록닳도록닳도록',
      time: '2024-12-02T10:55:28.104461',
      pageNumber: 0,
      totalPages: 1,
    },
    {
      senderId: 1,
      message: '하느님이',
      time: '2024-12-02T10:56:32.737144',
      pageNumber: 0,
      totalPages: 1,
    },
    {
      senderId: 2,
      message: '보우하사',
      time: '2024-12-02T10:57:28.104461',
      pageNumber: 0,
      totalPages: 1,
    },
    {
      senderId: 1,
      message: '우리나라',
      time: '2024-12-03T10:56:32.737144',
      pageNumber: 0,
      totalPages: 1,
    },
    {
      senderId: 2,
      message:
        '만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세만세',
      time: '2024-12-03T10:58:28.104461',
      pageNumber: 0,
      totalPages: 1,
    },
  ],
  addMessage: (message: IChatData) =>
    set(state => ({
      chatData: [...state.chatData, message],
    })),
}));

export default useChatStore;
