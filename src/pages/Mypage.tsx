import { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
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
        <MarginLessContainerTitle>내가 참여중인 상품</MarginLessContainerTitle>
      </MarginLessContainer>

      <MarginLessContainer>
        <MarginLessContainerTitle>내가 등록한 상품</MarginLessContainerTitle>
      </MarginLessContainer>

      <MarginLessContainer>
        <MarginLessContainerTitle>계정 관리</MarginLessContainerTitle>
        <StyledLink to={'./edit'}>내 정보 수정하기</StyledLink>
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
