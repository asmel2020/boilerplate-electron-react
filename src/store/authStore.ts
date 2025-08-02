import { authLogin } from "@/core/actions/auth-actions";
import Cookies from "js-cookie";
import { create } from "zustand";

const ACCESS_TOKEN = "session";

interface AuthUser {
  name: string;
  email: string;
  exp: number;
}

interface AuthState {
  auth: {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    accessToken: string | null;
    setAccessToken: (accessToken: string) => void;
    resetAccessToken: () => void;
    login: (email: string, password: string) => Promise<void>;
    reset: () => void;
  };
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = Cookies.get(ACCESS_TOKEN);
  const initToken = cookieState ? JSON.parse(cookieState) : null;
  return {
    auth: {
      user: null,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken: string | null) =>
        set((state) => {
          Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken));
          return { ...state, auth: { ...state.auth, accessToken } };
        }),
      resetAccessToken: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN);
          return { ...state, auth: { ...state.auth, accessToken: null } };
        }),
      reset: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN);
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: null },
          };
        }),
      login: async (email: string, password: string) => {
        const { token } = await authLogin(email, password);
        set((state) => {
          Cookies.set(ACCESS_TOKEN, JSON.stringify(token));
          return { ...state, auth: { ...state.auth, accessToken: token } };
        });
      },
    },
  };
});

// export const useAuth = () => useAuthStore((state) => state.auth)
