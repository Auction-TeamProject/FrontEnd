import { create } from 'zustand';

type UserStore = {
  user: null | string;
  setUser: (user: string) => void;
  loadUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => {
    sessionStorage.setItem('user', user);
    set({ user });
  },
  loadUser: () => {
    const user = sessionStorage.getItem('user');
    if (user) {
      set({ user });
    }
  },
}));

/**
 * 로그인 또는 새로고침시 사용자 정보를 세션 스토리지에서 불러옵니다
 */
export const useUserActions = () => {
  const { setUser, loadUser } = useUserStore();
  return { setUser, loadUser };
};

/**
 * 저장된 사용자 정보를 가져옵니다
 */
export const useUserState = () => {
  const { user } = useUserStore();
  return { user };
};
