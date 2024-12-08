// import { refreshAccessToken } from '@/utils/authUtils';
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export interface State {
//     accessToken: string;
//     refreshToken: string;
//     setAccessToken: (token: string) => void;
//     isLoggedIn: boolean;
//     setIsLoggedIn: (loggedIn: boolean) => void;
//     logOut: () => void;
//     refreshAccessToken: () => Promise<void>;
// }

// export const useStore = create(
//   persist<State>(
//     (set) => ({
//     accessToken: '',
//     refreshToken: '',
//     isLoggedIn: false,
//     setAccessToken: (token) => set({ accessToken: token, isLoggedIn: true }),
//     logOut: () => set({ accessToken: '', isLoggedIn: false }),
//     setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
//     refreshAccessToken: async () => {
//       try {
//         const currentRefreshToken = useStore.getState().refreshToken;
//         const newAccessToken = await refreshAccessToken(currentRefreshToken);
//         set({ accessToken: newAccessToken });
//         localStorage.setItem('accessToken', newAccessToken);
//       } catch {
//         useStore.getState().logOut();
//       }
//     },
//   }), 
//   {
//     name: 'userLoginStatus',
//   }
// ));

// export default useStore;

import { refreshAccessToken } from '@/utils/authUtils';
import { create } from 'zustand';

interface State {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (token: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  logOut: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const useStore = create<State>((set, get) => ({
  accessToken: '',
  refreshToken: '',
  isLoggedIn: false,
  setAccessToken: (token) => set({ accessToken: token }),
  logOut: () => set({ accessToken: '', refreshToken: '', isLoggedIn: false }),
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  refreshAccessToken: async () => {
    const { refreshToken } = get();
    const newAccessToken = await refreshAccessToken(refreshToken);
    set({ accessToken: newAccessToken });
  },
}));
