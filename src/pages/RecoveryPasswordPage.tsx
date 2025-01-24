import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';

import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import { useToastActions } from '../context/toastStore';
import {
  BarButton,
  FormContainer,
  PaddingPageContainer,
  StyledInput,
  StyledLabel,
} from '../styles/commonStyle';

type RecoveryIdFormType = {
  email: string;
  loginId: string;
};

/**api 연결안됨 */
const RecoveryPasswordPage = () => {
  const { setHeaderTitle } =
    useOutletContext<DropDownHeaderLayoutContextType>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryIdFormType>({ mode: 'onSubmit' });
  const { addToast } = useToastActions();

  useEffect(() => {
    setHeaderTitle('비밀번호 찾기');
    return () => {
      setHeaderTitle(null);
    };
  }, [setHeaderTitle]);

  const onsubmit = (data: RecoveryIdFormType) => {
    console.log(data);
  };
  const onSubmitError = () => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        addToast(error.message, 'warning');
      }
    });
  };

  return (
    <PaddingPageContainer>
      <FormContainer onSubmit={handleSubmit(onsubmit, onSubmitError)}>
        <StyledLabel htmlFor="loginId">
          아이디
          <StyledInput
            {...register('loginId', {
              required: { value: true, message: '아이디를 입력해주세요' },
            })}
            id="loginId"
            placeholder="아이디를 입력해주세요"
          ></StyledInput>
        </StyledLabel>

        <StyledLabel htmlFor="email">
          이메일
          <StyledInput
            {...register('email', {
              required: { value: true, message: '이메일을 입력해주세요' },
            })}
            id="email"
            placeholder="이메일을 입력해주세요"
          ></StyledInput>
        </StyledLabel>

        <BarButton type="submit">완료</BarButton>
      </FormContainer>
    </PaddingPageContainer>
  );
};

export default RecoveryPasswordPage;
