import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { BarButton, DesciptionContainer } from '../styles/commonStyle';

const EmailVerifyPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    console.log(params);
  }, [params]);

  return (
    <SendEmailPageContainer>
      <StyledP>인증 진행</StyledP>
      <CumstomDesciptionContainer>
        <p>인증을 진행중입니다</p>
        <p>잠시만 기다려 주세요</p>
      </CumstomDesciptionContainer>
      <BarButton onClick={() => navigate('/')}>홈으로 가기</BarButton>
    </SendEmailPageContainer>
  );
};

export default EmailVerifyPage;

const SendEmailPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10%;
  background-color: white;
`;

const CumstomDesciptionContainer = styled(DesciptionContainer)`
  gap: 0.5rem;
  margin-bottom: 1rem;

  p {
    color: var(--muted-text-color);
  }
`;

const StyledP = styled.p`
  margin: 0;
  margin-bottom: 1rem;
  font-size: var(--font-size-medium);
  font-weight: bold;
`;
