import {refreshAccessToken} from '@/utils/authUtils';
import {create} from 'zustand';

interface State {
  accessToken: string;
  refreshToken: string;
  userId: string;
  roomId: number | null;
  setRommId: (newRoomId: number | null) => void;
  setAccessToken: (token: string) => void;
  setUserId: (id: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  logOut: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const useStore = create<State>((set, get) => ({
  accessToken: '',
  refreshToken: '',
  userId: '',
  roomId: 1,
  isLoggedIn: false,
  setRommId: (newRoomId) => set({roomId: newRoomId}),
  setAccessToken: (token) => set({accessToken: token}),
  setUserId: (id) => set({userId: id}),
  setIsLoggedIn: (loggedIn) => set({isLoggedIn: loggedIn}),
  logOut: () => set({accessToken: '', refreshToken: '', isLoggedIn: false}),

  refreshAccessToken: async () => {
    const {refreshToken} = get();
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      set({accessToken: newAccessToken});
    } catch (error) {
      get().logOut();
    }
  },
}));
