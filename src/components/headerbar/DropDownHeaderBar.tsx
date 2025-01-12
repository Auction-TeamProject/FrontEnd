import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DropDown, { DropdownType } from '../DropDown';

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
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropDownButtonRef.current &&
      !dropDownButtonRef.current.contains(event.target as Node) &&
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target as Node)
    ) {
      setIsDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <HeaderBarContainer {...props}>
      <BackButton onClick={() => navigate(-1)}>
        <IoChevronBack />
      </BackButton>
      <HeaderBarTitle>{children}</HeaderBarTitle>
      {dropDownArray && dropDownArray.length > 1 && (
        <>
          {
            <DropdownButton
              onClick={() => setIsDropDown((prev) => !prev)}
              ref={dropDownButtonRef}
            >
              <GoKebabHorizontal />
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
  padding: var(--headerbar-gap);
  background-color: white;
  box-shadow: 0 8px 8px -8px rgb(0 0 0 / 30%);

  --headerbar-gap: 1rem;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  height: 100%;
  padding: var(--headerbar-gap);
  font-size: var(--font-size-medium);
`;

const DropdownButton = styled.button`
  position: absolute;
  right: 0;
  padding: var(--headerbar-gap);
  font-size: var(--font-size-medium);
  rotate: 90deg;
`;

const HeaderBarTitle = styled.h1`
  font-size: var(--font-size-medium);
  font-weight: bold;
`;
