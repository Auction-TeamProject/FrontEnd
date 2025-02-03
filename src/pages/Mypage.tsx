import { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import MyPageItemList from '../components/MyPageItemList';
import {
  MarginLessContainer,
  MarginLessContainerTitle,
  PaddingLessPageContainer,
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
    <PaddingLessPageContainer>
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
    </PaddingLessPageContainer>
  );
};

export default Mypage;

const StyledLink = styled(Link)`
  display: block;
  margin-top: var(--paddingless-page-container-gap);
  text-decoration: none;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  margin-top: var(--paddingless-page-container-gap);
`;

const ItemListContainer = styled.div`
  margin: 0;
  margin-top: var(--paddingless-page-container-gap);
`;
