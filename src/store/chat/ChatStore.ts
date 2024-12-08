import {create} from 'zustand';

interface IChatData {
  senderId: number;
  message: string;
  time: string;
  pageNumber: number; // 현재 페이지
  totalPages: number; // 총 페이지 수
}

interface ChatState {
  chatData: IChatData[];
  setMessage: (message: any) => void;
}

const useChatStore = create<ChatState>((set) => ({
  chatData: [],
  setMessage: (message) =>
    set((state) => ({
      chatData: message,
    })),
}));

export default useChatStore;
