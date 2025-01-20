import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { DropdownType } from '../DropDown';
import DropDownHeaderBar from '../headerbar/DropDownHeaderBar';

// 드롭다운 메뉴 헤더 레이아웃을 위한 컨텍스트 타입
export type DropDownHeaderLayoutContextType = {
  setDropDownArray: Dispatch<SetStateAction<Array<DropdownType> | undefined>>;
  setHeaderTitle: Dispatch<SetStateAction<ReactNode>>;
};

/**
 * 드롭다운 기능과 이전으로 가기 버튼이 포함된 헤더 레이아웃입니다
 * 드롭다운을 사용하려면 useOutletContext를 사용하여 setDropDownArray를 사용해야 합니다
 * 추가로 헤더 타이틀을 변경하려면 setHeaderTitle을 사용해야 합니다
 *
 * @example 
  const { setHeaderTitle, setDropDownArray } = useOutletContext<DropDownHeaderLayoutContextType>();

  useEffect(() => {
    setrHeaderTitle(<h1>테스트</h1>);
    setDropDownArray([
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
    ]);
    return () => {
      setDropDownArray([]);
      setrHeaderTitle(null);
    };
  }, [setDropDownArraysetHeaderTitle, setHeaderTitle]);
 */
const DropDownHeaderBarLayout = () => {
  const [dropDownArray, setDropDownArray] = useState<Array<DropdownType>>([]);
  const [headerTitle, setHeaderTitle] = useState<ReactNode>(null);

  return (
    <>
      <Header>
        <DropDownHeaderBar dropDownArray={dropDownArray}>
          {headerTitle}
        </DropDownHeaderBar>
      </Header>
      <Main>
        <Outlet
          context={{
            setDropDownArray,
            setHeaderTitle,
          }}
        />
      </Main>
    </>
  );
};

export default DropDownHeaderBarLayout;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
  width: 100%;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
`;
