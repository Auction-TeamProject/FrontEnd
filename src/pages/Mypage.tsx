import { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import MyPageItemList from '../components/MyPageItemList';
import {
  MarginLessContainer,
  MarginLessContainerTitle,
} from '../styles/commonStyle';

const Mypage = () => {
  const { setHeaderTitle } =
    useOutletContext<DropDownHeaderLayoutContextType>();

  useEffect(() => {
    setHeaderTitle('마이페이지');
    return () => {
      setHeaderTitle(null);
    };
  }, [setHeaderTitle]);

  return (
    <PageContainer>
      <MarginLessContainer>
        <MarginLessContainerTitle>내가 입찰중인 상품</MarginLessContainerTitle>
        <ItemListContainer>
          <MyPageItemList />
        </ItemListContainer>
      </MarginLessContainer>

      <MarginLessContainer>
        <MarginLessContainerTitle>내가 등록한 상품</MarginLessContainerTitle>
        <ItemListContainer>
          <MyPageItemList />
        </ItemListContainer>
      </MarginLessContainer>

      <MarginLessContainer>
        <MarginLessContainerTitle>프로필 수정</MarginLessContainerTitle>
        <StyledLink to={'./edit/nickname'}>닉네임 수정하기</StyledLink>
        <StyledLink to={'./edit/password'}>비밀번호 수정하기</StyledLink>
      </MarginLessContainer>

      <MarginLessContainer>
        <MarginLessContainerTitle>계정 관리</MarginLessContainerTitle>
        <StyledButton>로그아웃</StyledButton>
        <StyledLink to={'./delete'}>탈퇴하기</StyledLink>
      </MarginLessContainer>
    </PageContainer>
  );
};

export default Mypage;

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--item-detail-page-gap);
  width: 100%;
  height: 100%;
  margin-top: var(--item-detail-page-gap);

  --item-detail-page-gap: 8px;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-top: var(--item-detail-page-gap);
  text-decoration: none;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  margin-top: var(--item-detail-page-gap);
`;

const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  margin-top: var(--item-detail-page-gap);
`;
