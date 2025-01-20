import { ReactNode } from 'react';
import { create } from 'zustand';

type PopupState = {
  content: ReactNode | null;
  isOpen: boolean;
  closeCallback: () => void | undefined;
  confirmCallback: () => void | undefined;
};

type PopupActions = {
  openPopup: (
    content: ReactNode,
    closeCallback?: () => void | undefined,
    confirmCallback?: () => void | undefined
  ) => void;
  closePopup: (closeCallback?: () => void) => void;
};

const usePopupModalStore = create<PopupState & PopupActions>((set, get) => ({
  content: null,
  isOpen: false,
  type: 'alert',
  closeCallback: () => undefined,
  confirmCallback: () => undefined,

  openPopup: (
    content: ReactNode,
    closeCallback?: () => void,
    confirmCallback?: () => void
  ) => {
    set({ content, isOpen: true, closeCallback, confirmCallback });
  },
  closePopup: () => {
    const { closeCallback } = get();
    set({
      content: null,
      isOpen: false,
      closeCallback: undefined,
      confirmCallback: undefined,
    });
    if (closeCallback) closeCallback();
  },
}));

/**
 * 팝업 모달의 상태를 반환합니다.
 * @returns content - 팝업에 띄울 내용
 * @returns isOpen - 팝업이 열려 있는지 여부
 * @returns type - 팝업 종류
 * @returns closeCallback - 팝업을 닫을 때 추가적인 작업이 필요하다면 이 콜백을 사용합니다. 닫을 때 자동으로 실행됩니다
 * @returns confirmCallback - type이 confirm이고 확인 버튼을 누를 때 추가적인 작업이 필요하다면 이 콜백을 사용합니다. 직접 실행해야 합니다
 */
export const usePopupState = () => {
  const content = usePopupModalStore((state) => state.content);
  const isOpen = usePopupModalStore((state) => state.isOpen);
  const closeCallback = usePopupModalStore((state) => state.closeCallback);
  const confirmCallback = usePopupModalStore((state) => state.confirmCallback);

  return { content, isOpen, closeCallback, confirmCallback };
};

/**
 * 팝업 모달의 액션을 반환합니다.
 * @returns openPopup - 팝업을 엽니다
 * @returns closePopup - 팝업을 닫습니다
 */
export const usePopupActon = () => {
  const openPopup = usePopupModalStore((state) => state.openPopup);
  const closePopup = usePopupModalStore((state) => state.closePopup);
  return { openPopup, closePopup };
};
