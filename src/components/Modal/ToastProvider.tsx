import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { useToast, useToastActions } from '../../context/toastStore';
import ToastModal from './ToastModal';

type ToastProviderProps = {
  children?: ReactNode;
};
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const { ToastArray: toasts } = useToast();
  const { removeToast } = useToastActions();

  return (
    <>
      {children}
      <ToastBackground>
        <AnimatePresence>
          {toasts.map((toastItem) => (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => removeToast(toastItem.id)}
              key={toastItem.id}
            >
              <ToastModal type={toastItem.type}>{toastItem.message}</ToastModal>
            </motion.div>
          ))}
        </AnimatePresence>
      </ToastBackground>
    </>
  );
};

const ToastBackground = styled.div`
  position: absolute;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px;
  pointer-events: none;
`;
