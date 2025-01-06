import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DropDown, { DropdownType } from './DropDown';

type DropdownHeaderProps = {
  children?: ReactNode;
  dropDownArray?: Array<DropdownType>;
} & HTMLAttributes<HTMLDivElement>;

const DropDownHeaderBar = ({
  children,
  dropDownArray,
  ...props
}: DropdownHeaderProps) => {
  const navigate = useNavigate();
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLUListElement>(null);
  const dropDownButtonRef = useRef<HTMLButtonElement>(null);

  // 드롭다운 메뉴 외부클릭시 닫는 이벤트 등록
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        event.target instanceof Node &&
        !dropDownRef.current.contains(event.target) &&
        event.target !== dropDownButtonRef.current
      ) {
        setIsDropDown(false);
        console.log('click outside');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <HeaderBarContainer {...props}>
      <BackButton onClick={() => navigate(-1)}>back</BackButton>
      <HeaderBarTitle>{children}</HeaderBarTitle>
      {dropDownArray && dropDownArray.length > 1 && (
        <>
          {
            <DropdownButton
              onClick={() => setIsDropDown((prev) => !prev)}
              ref={dropDownButtonRef}
            >
              {String(isDropDown)}
            </DropdownButton>
          }
          {isDropDown && (
            <DropDown dropDownArray={dropDownArray} ref={dropDownRef}>
              dropdown
            </DropDown>
          )}
        </>
      )}
    </HeaderBarContainer>
  );
};

export default DropDownHeaderBar;

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
