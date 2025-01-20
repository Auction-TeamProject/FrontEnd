import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import { BarButton } from '../../styles/commonStyle';

type PopupModalProps = {
  children?: ReactNode;
  onClose: () => void;
} & HTMLAttributes<HTMLDivElement>;

const PopupModal = ({ children, onClose, ...props }: PopupModalProps) => {
  return (
    <PopupModalContainer {...props}>
      <ModalMessageContainer>{children}</ModalMessageContainer>
      <ModalButtonContainer>
        <BarButton onClick={onClose}>확인</BarButton>
      </ModalButtonContainer>
    </PopupModalContainer>
  );
};

export default PopupModal;

const PopupModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 20rem;
  pointer-events: auto;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgb(0 0 0 / 50%);
`;

const ModalMessageContainer = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
`;
