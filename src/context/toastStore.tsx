import { ReactNode } from 'react';
import { create } from 'zustand';

export type ToastMessageTypes = 'success' | 'error' | 'info' | 'warning';

type Toast = {
  id: number;
  message: ReactNode;
  type: ToastMessageTypes;
  duration: number;
  timerId: ReturnType<typeof setTimeout>;
};

type ToastArray = Toast[];

type ToastState = {
  ToastArray: ToastArray;
  addToast: (
    message: ReactNode,
    type?: ToastMessageTypes,
    duration?: number
  ) => void;
  removeToast: (id: number) => void;
};

// 토스트 식별 아이디 번호(addToast 함수 호출시마다 증가)
let nextId = 0;

/**
 * 토스트 관리를 위한 store를 생성합니다.
 */
const useToastStore = create<ToastState>((set) => ({
  ToastArray: [],
  addToast: (message, type = 'info', duration = 3000) => {
    const id = nextId++;
    const timerId = setTimeout(() => {
      set((state) => ({
        ToastArray: state.ToastArray.filter((toast) => toast.id !== id),
      }));
    }, duration);

    set((state) => ({
      ToastArray: [
        ...state.ToastArray,
        { id, message, type, duration, timerId },
      ],
    }));
  },
  removeToast: (id) => {
    set((state) => {
      const toastToRemove = state.ToastArray.find((toast) => toast.id === id);
      if (toastToRemove) {
        clearTimeout(toastToRemove.timerId);
      }
      return {
        ToastArray: state.ToastArray.filter((toast) => toast.id !== id),
      };
    });
  },
}));

/**
 * 토스트 액션을 반환합니다.
 * 토스트를 추가하거나 삭제할 때 사용합니다.
 */
export const useToastActions = () => {
  const addToast = useToastStore((state) => state.addToast);
  const removeToast = useToastStore((state) => state.removeToast);
  return { addToast, removeToast };
};

/**
 * 토스트 상태를 반환합니다.
 * ToastPovider에서 렌더링시 사용하므로 직접 사용하지 않습니다.
 */
export const useToast = () => {
  const ToastArray = useToastStore((state) => state.ToastArray);
  return { ToastArray };
};
