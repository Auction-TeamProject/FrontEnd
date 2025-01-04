import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { dropdownType } from '../dropdown';
import HeaderBar from '../HeaderBar';

//해당 레이아웃을 사용하는 페이지에서는 useOutletContext를 사용하여 변경이 해야함
export type LayoutContextType = {
  setHeaderTitle: (title: string) => void;
  setIsBackButton: (isBackButton: boolean) => void;
  setIsShowDropDown: (isShowDropDown: boolean) => void;
  dropDownArray: Array<dropdownType>;
};

const dropDownArray: Array<dropdownType> = [
  {
    name: '테스트1',
    callback: () => {
      console.log('테스트1');
    },
  },
  {
    name: '테스트2',
    callback: () => {
      console.log('테스트2');
    },
  },
];

const HeaderBarLayout = () => {
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [isBackButton, setIsBackButton] = useState<boolean>(true);
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(true);

  return (
    <>
      <Header>
        <HeaderBar
          isBackButton={isBackButton}
          showDropdown={isShowDropDown}
          dropDownArray={dropDownArray}
        >
          {headerTitle}
        </HeaderBar>
      </Header>
      <Main>
        <Outlet
          context={{
            setHeaderTitle,
            setIsBackButton,
            setIsShowDropDown,
            dropDownArray,
          }}
        />
      </Main>
    </>
  );
};

export default HeaderBarLayout;

const Header = styled.header`
  width: 100%;
`;
const Main = styled.main`
  width: 100%;
`;
