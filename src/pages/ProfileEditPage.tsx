import { useEffect, useRef } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useOutletContext } from 'react-router-dom';

import CheckForm, { CheckFormRef } from '../components/auth/CheckForm';
import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import {
  BarButton,
  FlexibleBarButton,
  InputContainer,
  InputSection,
  PaddingPageContainer,
  StyledLabel,
} from '../styles/commonStyle';

const ProfileEditPage = () => {
  const { setHeaderTitle } =
    useOutletContext<DropDownHeaderLayoutContextType>();
  const nicknameRef = useRef<CheckFormRef>(null);
  const emailRef = useRef<CheckFormRef>(null);

  useEffect(() => {
    setHeaderTitle('회원정보 수정');
    return () => {
      setHeaderTitle(null);
    };
  }, [setHeaderTitle]);

  return (
    <PaddingPageContainer>
      <InputSection>
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
          이메일 수정
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

        <BarButton type="submit">수정 완료</BarButton>
      </InputSection>
    </PaddingPageContainer>
  );
};

export default ProfileEditPage;
