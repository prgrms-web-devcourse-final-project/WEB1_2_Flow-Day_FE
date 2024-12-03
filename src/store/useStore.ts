import {create} from 'zustand';

export interface State {
    accessToken: string;
    setAccessToken: (token: string) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
    logOut: () => void;
}

export const useStore = create<State>((set) => ({
    accessToken: '',
    isLoggedIn: false,
    setAccessToken: (token) => set({ accessToken: token, isLoggedIn: true }),
    logOut: () => set({ accessToken: '', isLoggedIn: false }),
    setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  }));

export default useStore;