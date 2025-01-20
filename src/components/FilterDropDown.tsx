import { AnimatePresence, motion } from 'framer-motion';
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
      <AnimatePresence>
        {isDropDown && (
          <AbsoluteContainer
            as={motion.div}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <RelativeDropDown dropDownArray={dropDownArray} ref={dropDownRef}>
              dropdown
            </RelativeDropDown>
          </AbsoluteContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterDropDown;

const DropdownButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0.5rem;
  font-size: var(--font-size-small);
  color: var(--secondary-text-color);

  svg {
    margin: 0;
  }
`;

const AbsoluteContainer = styled.div`
  position: relative;
  top: 0;
  right: 0;
  z-index: 1;
  width: 100%;
`;
const RelativeDropDown = styled(DropDown)`
  top: auto;
  right: 0;
`;
