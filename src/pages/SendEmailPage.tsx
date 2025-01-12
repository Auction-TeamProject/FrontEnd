import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BarButton } from '../styles/commonStyle';

const SendEmailPage = () => {
  const navigate = useNavigate();
  return (
    <SendEmailPageContainer>
      인증 메일을 발송했습니다.
      <br />
      메일을 확인해주세요.
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
