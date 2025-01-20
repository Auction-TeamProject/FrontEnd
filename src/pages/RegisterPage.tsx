import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import CheckForm, { CheckFormRef } from '../components/auth/CheckForm';
import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import { useToastActions } from '../context/toastStore';
import {
  BarButton,
  ErrorDescription,
  FlexibleBarButton,
  InputContainer,
  InputSection,
  StyledInput,
  StyledLabel,
} from '../styles/commonStyle';

const RegisterPage = () => {
  const { setHeaderTitle } =
    useOutletContext<DropDownHeaderLayoutContextType>();
  const idRef = useRef<CheckFormRef>(null);
  const nicknameRef = useRef<CheckFormRef>(null);
  const emailRef = useRef<CheckFormRef>(null);
  const { addToast } = useToastActions();
  const navigate = useNavigate();

  const RegisterMutation = useMutation({
    mutationFn: fetchRegister,
    onSuccess: () => {
      addToast('회원가입 성공', 'success');
      navigate('/register/email-send', {
        state: { email: emailRef.current?.data },
      });
    },
  });

  useEffect(() => {
    setHeaderTitle('회원가입');
    return () => {
      setHeaderTitle(null);
    };
  }, [setHeaderTitle]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data: { [key: string]: string }) => {
    if (
      !idRef.current?.data ||
      !nicknameRef.current?.data ||
      !emailRef.current?.data
    ) {
      onSubmitError();
      return;
    }
    RegisterMutation.mutate({
      password: data.password,
      loginId: idRef.current.data,
      nickname: nicknameRef.current.data,
      email: emailRef.current.data,
    });
  };
  const onSubmitError = () => {
    if (!idRef.current?.data) {
      addToast('아이디를 확인해주세요', 'warning');
    }
    if (!nicknameRef.current?.data) {
      addToast('닉네임을 확인해주세요', 'warning');
    }
    if (errors.password) {
      addToast('비밀번호를 확인해주세요', 'warning');
    }
    if (!emailRef.current?.data) {
      addToast('이메일을 확인해주세요', 'warning');
    }
  };

  return (
    <RegisterPageContainer>
      <InputSection>
        <StyledLabel htmlFor="id">
          아이디
          <InputContainer>
            <CheckForm
              ref={idRef}
              RegisterOptions={{
                required: { value: true, message: '아이디를 입력해주세요' },
              }}
              checkName={'id'}
              placeholder="아이디를 입력해주세요"
            ></CheckForm>
            <FlexibleBarButton
              onClick={() => idRef.current?.onSubmitCallback()}
            >
              {idRef.current?.isLoading ? <AiOutlineLoading /> : '중복확인'}
            </FlexibleBarButton>
          </InputContainer>
        </StyledLabel>

        <StyledLabel htmlFor="password">
          비밀번호
          <StyledInput
            placeholder="비밀번호를 입력해주세요"
            type="password"
            id="password"
            {...register('password', {
              required: { value: true, message: '비밀번호를 입력해주세요' },
            })}
          ></StyledInput>
          <ErrorDescription>
            {String(errors.password?.message || '')}
          </ErrorDescription>
        </StyledLabel>

        <StyledLabel htmlFor="nickname">
          닉네임
          <InputContainer>
            <CheckForm
              ref={nicknameRef}
              RegisterOptions={{
                required: { value: true, message: '닉네임을 입력해주세요' },
              }}
              checkName={'nickname'}
              placeholder="닉네임을 입력해주세요"
            ></CheckForm>
            <FlexibleBarButton
              onClick={() => nicknameRef.current?.onSubmitCallback()}
            >
              {nicknameRef.current?.isLoading ? (
                <AiOutlineLoading />
              ) : (
                '중복확인'
              )}
            </FlexibleBarButton>
          </InputContainer>
        </StyledLabel>

        <StyledLabel htmlFor="email">
          이메일
          <InputContainer>
            <CheckForm
              ref={emailRef}
              RegisterOptions={{
                required: { value: true, message: '이메일을 입력해주세요' },
              }}
              checkName={'email'}
              placeholder="이메일을 입력해주세요"
            ></CheckForm>
            <FlexibleBarButton
              onClick={() => emailRef.current?.onSubmitCallback()}
            >
              {emailRef.current?.isLoading ? <AiOutlineLoading /> : '중복확인'}
            </FlexibleBarButton>
          </InputContainer>
        </StyledLabel>

        <BarButton onClick={handleSubmit(onSubmit, onSubmitError)}>
          {RegisterMutation.isPending ? (
            <AiOutlineLoading />
          ) : (
            '인증 메일 보내기'
          )}
        </BarButton>
      </InputSection>
    </RegisterPageContainer>
  );
};

export default RegisterPage;

const fetchRegister = async (data: { [key: string]: string }) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_API_URL + '/members',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

const RegisterPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: white;
`;
