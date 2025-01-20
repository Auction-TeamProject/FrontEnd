import { HTMLAttributes, ReactNode } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { DropdownType } from '../DropDown';

type DropdownHeaderProps = {
  children?: ReactNode;
  dropDownArray?: Array<DropdownType>;
} & HTMLAttributes<HTMLDivElement>;

const HomeHeaderBar = ({ children, ...props }: DropdownHeaderProps) => {
  return (
    <HeaderBarContainer {...props}>
      <HeaderBarTitle>{children}</HeaderBarTitle>
      <ButtonContainer>
        <Link to="/mypage">
          <IoPersonOutline />
        </Link>
        <button>
          <IoNotificationsOutline />
        </button>
      </ButtonContainer>
    </HeaderBarContainer>
  );
};

export default HomeHeaderBar;

const HeaderBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.75rem;
  padding: var(--headerbar-gap);
  background-color: white;
  box-shadow: 0 8px 8px -8px rgb(0 0 0 / 30%);

  --headerbar-gap: 1rem;
`;

const HeaderBarTitle = styled.h1`
  margin: 0 auto 0 0;
  font-size: var(--font-size-medium);
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: var(--headerbar-gap);
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
  font-size: 1.5rem;
`;
