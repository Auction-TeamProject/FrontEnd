import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BarButton, DesciptionContainer } from '../styles/commonStyle';

const SendEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SendEmailPageContainer>
      <StyledP>인증 메일 발송</StyledP>
      <CumstomDesciptionContainer>
        <p>{location.state}로 인증 메일을 발송했습니다.</p>
        <p> 전송된 이메일의 링크를 클릭하여 </p>
        <p> 이메일 인증을 완료해주세요.</p>
      </CumstomDesciptionContainer>
      <BarButton onClick={() => navigate('/')}>홈으로 가기</BarButton>
    </SendEmailPageContainer>
  );
};

export default SendEmailPage;

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
