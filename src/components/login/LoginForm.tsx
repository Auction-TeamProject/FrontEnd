import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useToastActions } from '../../context/toastStore';
import { useUserActions } from '../../context/userStore';
import {
  BarButton,
  FormContainer,
  StyledInput,
} from '../../styles/commonStyle';

type LoginFormType = {
  loginId: string;
  password: string;
};

type LoginResponseType = {
  status: string;
  message: string;
  data: {
    role: string;
    loginId: string;
  };
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({ mode: 'onSubmit' });

  const { addToast } = useToastActions();
  const { setUser } = useUserActions();

  const onSuccess = (data: LoginResponseType) => {
    addToast(data.message, 'success');
    setUser(data.data.loginId);
  };
  const onError = (error: Error) => {
    addToast('로그인 실패', 'warning');
    setUser('작성자'); //원래 성공시 사용해야하지만 테스트를 위해 사용
    console.log(error);
  };
  const loginMutation = useMutation({
    mutationFn: fetchLogin,
    onSuccess,
    onError,
  });

  const onSubmit = (data: LoginFormType) => {
    console.log(data);
    loginMutation.mutate(data);
  };

  const onSubmitError = () => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        addToast(error.message, 'warning');
      }
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <StyledInput
        {...register('loginId', {
          required: { value: true, message: '아이디를 입력해주세요' },
        })}
        type="text"
        id="loginId"
        placeholder="아이디"
      ></StyledInput>
      <StyledInput
        {...register('password', {
          required: { value: true, message: '비밀번호를 입력해주세요' },
        })}
        type="password"
        id="password"
        placeholder="비밀번호"
      ></StyledInput>
      <RecoveryContainer>
        <Link to={'/recovery/id'}>아이디 찾기</Link>/
        <Link to={'/recovery/password'}>비밀번호 찾기</Link>
      </RecoveryContainer>
      <BarButton type="submit">
        {loginMutation.isPending ? <AiOutlineLoading /> : '로그인'}
      </BarButton>

      <RegisterContainer>
        아직 회원이 아니신가요?<Link to="/register">회원가입</Link>
      </RegisterContainer>
    </FormContainer>
  );
};

export default LoginForm;

const fetchLogin = async (loginData: LoginFormType) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_API_URL + '/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    //헤더에 발급되는 액세스 토큰 저장
    const token = response.headers.get('Authorization');
    if (token) {
      sessionStorage.setItem('accessToken', token);
    }
  }
  return response.json();
};

const RecoveryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  justify-content: flex-end;
  width: 100%;
  margin: 0;
  font-size: var(--font-size-small);
  color: var(--muted-text-color);
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
