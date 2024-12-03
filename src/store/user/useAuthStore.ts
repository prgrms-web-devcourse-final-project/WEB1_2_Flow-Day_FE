import { createStore } from "zustand";
import { persist } from "zustand/middleware"

type AuthStore = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;

    userId: string | null;
    setUserId: (userId: string) => void;
    userName: string | null;
    setUserName: (userName: string) => void;
    userNickname: string | null;
    setUserNickname: (userNickname: string) => void;
    userNumber: number | null;
    setUserNumber: (userNumber: number) => void;
}

const useAuthStore = createStore(
    persist<AuthStore>(
        (set) => ({
          isLoggedIn: false,
          login: () => set({ isLoggedIn: true }),
          logout: () =>
            set({
              isLoggedIn: false,
              userId: null,
              userNickname: null,
              userNumber: null,
              userName: null,
            }),
          userId: null,
          setUserId: (userId: string) => set({ userId: userId }),
          userName: null,
          setUserName: (userName: string) => set({ userName: userName }),
          userNickname: null,
          setUserNickname: (userNickname: string) =>
            set({ userNickname: userNickname }),
          userNumber: null,
          setUserNumber: (userNumber: number) => set({ userNumber: userNumber }),
        }),
        {
          name: "AuthStorage",
        }
    )
)

export { useAuthStore };