import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import { BarButton, DesciptionContainer } from '../styles/commonStyle';

const AccountDeletePage = () => {
  const { setHeaderTitle } =
    useOutletContext<DropDownHeaderLayoutContextType>();
  useEffect(() => {
    setHeaderTitle('회원 탈퇴');
    return () => {
      setHeaderTitle(null);
    };
  }, [setHeaderTitle]);

  const navigate = useNavigate();

  return (
    <AccountDeletePageContainer>
      <StyledP>정말 삭제하시겠어요?</StyledP>
      <DesciptionContainer>
        <li>서비스 탈퇴시 개인정보가 삭제되며 복구할 수 없어요</li>
        <li>참여하거나 등록된 경매가 자동으로 취소되거나 삭제되요</li>
      </DesciptionContainer>
      <ButtonContainer>
        <BarButton>회원 탈퇴</BarButton>
        <CustomBarButton onClick={() => navigate(-1)}>취소</CustomBarButton>
      </ButtonContainer>
    </AccountDeletePageContainer>
  );
};

export default AccountDeletePage;

const AccountDeletePageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10%;
  background-color: white;
`;

const StyledP = styled.p`
  margin: 0;
  margin-bottom: 1rem;
  font-size: var(--font-size-medium);
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const CustomBarButton = styled(BarButton)`
  background-color: var(--muted-text-color);
`;
