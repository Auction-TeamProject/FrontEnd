import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import HomeHeaderBar from '../headerbar/HomeHeaderBar';

const HomeHeaderBarLayout = () => {
  return (
    <>
      <Header>
        <HomeHeaderBar>프로젝트 이름</HomeHeaderBar>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default HomeHeaderBarLayout;

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
