import { HTMLAttributes, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DropDown, { dropdownType } from './dropdown';

type HeaderBarProps = {
  children?: ReactNode;
  isBackButton: boolean;
  showDropdown: boolean;
  dropDownArray?: Array<dropdownType>;
} & HTMLAttributes<HTMLDivElement>;

const HeaderBar = ({
  children,
  isBackButton,
  showDropdown,
  dropDownArray,
  ...props
}: HeaderBarProps) => {
  const navigate = useNavigate();
  const [isDropDown, setIsDropDown] = useState<boolean>(false);

  return (
    <HeaderBarContainer {...props}>
      {isBackButton && (
        <BackButton onClick={() => navigate(-1)}>back</BackButton>
      )}
      <HeaderBarTitle>{children}</HeaderBarTitle>
      {showDropdown && (
        <DropdownButton onClick={() => setIsDropDown((prev) => !prev)}>
          {String(isDropDown)}
        </DropdownButton>
      )}
      {isDropDown && (
        <DropDown dropDownArray={dropDownArray}>dropdown</DropDown>
      )}
    </HeaderBarContainer>
  );
};

export default HeaderBar;

const HeaderBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.75rem;
  padding: 8px;
  background-color: white;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 30%);
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
`;

const DropdownButton = styled.button`
  position: absolute;
  right: 0;
`;

const HeaderBarTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
`;
