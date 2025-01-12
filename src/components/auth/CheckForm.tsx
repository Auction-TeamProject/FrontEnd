import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  forwardRef,
  HtmlHTMLAttributes,
  useCallback,
  useImperativeHandle,
} from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import styled from 'styled-components';

import {
  ErrorDescription,
  FormContainer,
  StyledInput,
} from '../../styles/commonStyle';

export type CheckFormRef = {
  onSubmitCallback: () => void;
  data: string | undefined;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
};

type CheckFormType = {
  [key: string]: string;
};

type CheckFormProps = {
  checkName: string;
  RegisterOptions: RegisterOptions;
  placeholder: string;
} & HtmlHTMLAttributes<HTMLFormElement>;

const CheckForm = forwardRef<CheckFormRef, CheckFormProps>(
  ({ checkName, RegisterOptions, placeholder, ...props }, ref) => {
    const queryClient = useQueryClient();

    const { data, error, isLoading, isSuccess } = useQuery({
      queryKey: [checkName],
      queryFn: () => fetchCheck(checkName, ''),
      enabled: false,
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CheckFormType>({ mode: 'all' });

    const onSubmit = useCallback(
      (inputValue: CheckFormType) => {
        console.log(inputValue);
        const newCheckValue = inputValue[checkName];
        queryClient
          .fetchQuery({
            queryKey: [checkName],
            queryFn: () => fetchCheck(checkName, newCheckValue),
          })
          .then((newData) => {
            //즉시 새값을 적용(혹시 재 랜더링이 안될경우를 대비해서)
            queryClient.setQueryData([checkName], newData);
          });
      },
      [checkName, queryClient]
    );

    useImperativeHandle(
      ref,
      () => ({
        onSubmitCallback: () => {
          handleSubmit(onSubmit)();
        },
        data,
        error,
        isLoading,
        isSuccess,
      }),
      [data, error, handleSubmit, isLoading, isSuccess, onSubmit]
    );

    return (
      <StyledFormContainer {...props}>
        <StyledInput
          {...register(checkName, RegisterOptions)}
          placeholder={placeholder}
          id={checkName}
        />
        <ErrorDescription>
          {errors[checkName]?.message || (data ? '사용 가능합니다' : '')}
        </ErrorDescription>
      </StyledFormContainer>
    );
  }
);

CheckForm.displayName = 'CheckForm';
export default CheckForm;

/**
 * useQuery 통신 함수
 * 서버에서 통과되면 checkValue를 반환합니다
 *
 * @async
 * @param {string} checkName
 * @param {string} checkValue
 * @returns {string} checkName
 */
const fetchCheck = async (checkName: string, checkValue: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/members/${checkName}?value=${checkValue}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return checkValue;
};

const StyledFormContainer = styled(FormContainer)`
  flex: 2;
  gap: 0;
`;
