import { HTMLAttributes, ReactNode } from 'react';
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
    </HeaderBarContainer>
  );
};

export default HomeHeaderBar;

const HeaderBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 3.75rem;
  padding: var(--headerbar-gap);
  background-color: white;
  box-shadow: 0 8px 8px -8px rgb(0 0 0 / 30%);

  --headerbar-gap: 1rem;
`;
const HeaderBarTitle = styled.h1`
  font-size: var(--font-size-medium);
  font-weight: bold;
`;
