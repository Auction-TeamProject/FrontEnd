import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import { BarButton } from '../styles/commonStyle';

const AccountDeletePage = () => {
  const { setHeaderTitle } =
    useOutletContext<DropDownHeaderLayoutContextType>();
  useEffect(() => {
    setHeaderTitle('회원 탈퇴');
    return () => {
      setHeaderTitle(null);
    };
  }, [setHeaderTitle]);
  return (
    <AccountDeletePageContainer>
      <p>정말 삭제하시겠어요?</p>
      <p>서비스 탈퇴시 개인정보 및</p>
      <p>참여하거나 등록된 경매가</p>
      <p>자동으로 취소되요</p>
      <BarButton>회원 탈퇴</BarButton>
    </AccountDeletePageContainer>
  );
};

export default AccountDeletePage;

const AccountDeletePageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 10%;
  background-color: white;
`;
