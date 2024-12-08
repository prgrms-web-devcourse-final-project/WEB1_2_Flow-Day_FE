import {refreshAccessToken} from '@/utils/authUtils';
import {create} from 'zustand';

interface State {
  accessToken: string;
  refreshToken: string;
  userId: string;
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
  isLoggedIn: false,
  setAccessToken: (token) => set({accessToken: token, isLoggedIn: true}),
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
