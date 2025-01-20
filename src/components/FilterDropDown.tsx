import { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import DropDown, { DropdownType } from './DropDown';

type FilterDropDownProps = {
  children: ReactNode;
  dropDownArray: Array<DropdownType>;
};

const FilterDropDown = ({ children, dropDownArray }: FilterDropDownProps) => {
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
    <>
      <DropdownButton
        onClick={() => setIsDropDown((prev) => !prev)}
        ref={dropDownButtonRef}
      >
        {children}
      </DropdownButton>
      {isDropDown && (
        <DropDown dropDownArray={dropDownArray} ref={dropDownRef}>
          dropdown
        </DropDown>
      )}
    </>
  );
};

export default FilterDropDown;

const DropdownButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    margin: 0;
  }
`;
