import create from 'zustand';

// 1대1 채팅 메시지 타입
interface Message {
  text: string;
  sender: 'user1' | 'user2';
  timestamp: number;
}

// 커플 정보 타입
interface Couple {
  user1: { id: string; name: string };
  user2: { id: string; name: string };
}

// 상태 타입
interface ChatStore {
  messages: Message[];
  currentMessage: string;
  isLoading: boolean;
  couple: Couple | null;

  addMessage: (message: Message) => void;
  setCurrentMessage: (message: string) => void;
  setLoading: (loading: boolean) => void;
  setCouple: (
    user1: { id: string; name: string },
    user2: { id: string; name: string },
  ) => void;
  resetChat: () => void;
}

const useChatStore = create<ChatStore>(set => ({
  messages: [],
  currentMessage: '',
  isLoading: false,
  couple: null,

  // 메시지 추가
  addMessage: message =>
    set(state => ({
      messages: [...state.messages, message],
    })),

  // 현재 입력 중인 메시지 설정
  setCurrentMessage: message => set({ currentMessage: message }),

  // 로딩 상태 설정
  setLoading: loading => set({ isLoading: loading }),

  // 커플 정보 설정
  setCouple: (user1, user2) => set({ couple: { user1, user2 } }),

  // 채팅 초기화
  resetChat: () =>
    set({ messages: [], currentMessage: '', isLoading: false, couple: null }),
}));

export default useChatStore;
