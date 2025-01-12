import { Link } from 'react-router-dom';
import styled from 'styled-components';

import brandImg from '../assets/react.svg';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <LoginSection>
        <AppLogo src={brandImg} />
        <LoginForm />
        <RegisterContainer>
          아직 회원이 아니신가요?<Link to="/register">회원가입</Link>
        </RegisterContainer>
      </LoginSection>
      <SocialLoginSection>
        <SocialLoginDivider>
          <DivderText>SNS 간편 로그인</DivderText>
        </SocialLoginDivider>
        <SocialLoginButtonContainer>
          <SocialLoginButton
            onClick={() =>
              (window.location.href =
                import.meta.env.VITE_BACKEND_API_URL +
                '/oauth2/authorization/naver')
            }
          >
            <img src={brandImg}></img>
          </SocialLoginButton>
          <SocialLoginButton
            onClick={() =>
              (window.location.href =
                import.meta.env.VITE_BACKEND_API_URL +
                '/oauth2/authorization/kakao')
            }
          >
            <img src={brandImg}></img>
          </SocialLoginButton>
          <SocialLoginButton
            onClick={() =>
              (window.location.href =
                import.meta.env.VITE_BACKEND_API_URL +
                '/oauth2/authorization/google')
            }
          >
            <img src={brandImg}></img>
          </SocialLoginButton>
        </SocialLoginButtonContainer>
      </SocialLoginSection>
    </LoginPageContainer>
  );
};

export default LoginPage;

const LoginPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const LoginSection = styled.section`
  display: flex;
  flex: 4;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10%;
`;

const SocialLoginSection = styled.section`
  position: relative;
  bottom: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: auto;
`;

const AppLogo = styled.img`
  width: 100%;
  height: 100px;
  margin: 3rem 0;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1rem 0;
  font-size: var(--font-size-small);
  color: var(--muted-text-color);
`;

const SocialLoginDivider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--muted-text-color);
  background-color: white;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    content: '';
    border-top: 1px solid var(--muted-text-color);
    transform: translateY(-50%);
  }
`;

const DivderText = styled.p`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: var(--muted-text-color);
  background-color: white;
`;

const SocialLoginButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 25%;
`;

const SocialLoginButton = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  border: 1px solid var(--muted-text-color);
`;
