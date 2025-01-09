import { HTMLAttributes, ReactNode } from 'react';
import { TbAlertCircle, TbAlertTriangle, TbCircleCheck } from 'react-icons/tb';
import { VscError } from 'react-icons/vsc';
import styled from 'styled-components';

import { ToastMessageTypes } from '../../context/toastStore.tsx';

type ToastProps = {
  type: ToastMessageTypes;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const icon = {
  success: <TbCircleCheck />,
  error: <VscError />,
  info: <TbAlertCircle />,
  warning: <TbAlertTriangle />,
};

const ToastModal = ({ type, children, ...props }: ToastProps) => {
  return (
    <ToastContainer {...props}>
      <IconContainer>{icon[type]}</IconContainer>
      <TextContainer>{children}</TextContainer>
    </ToastContainer>
  );
};

export default ToastModal;

const ToastContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.7rem;
  margin: 0;
  overflow: hidden;
  pointer-events: auto;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: 1.5rem;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-left: 1rem;
`;
