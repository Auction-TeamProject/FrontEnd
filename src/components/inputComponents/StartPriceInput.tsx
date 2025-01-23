import { HTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { StyledInput, StyledLabel } from '../../styles/commonStyle';

type StartPriceInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
} & HTMLAttributes<HTMLLabelElement>;

const StartPriceInput = <T extends FieldValues>({
  register,
  fieldName,
  ...props
}: StartPriceInputProps<T>) => {
  return (
    <StyledLabel htmlFor={fieldName} {...props}>
      판매 시작 가격
      <StyledInput
        placeholder="시작 가격을 입력해주세요"
        type="number"
        id={fieldName}
        {...register(fieldName, {
          required: { value: true, message: '시작 가격을 입력해주세요' },
        })}
      ></StyledInput>
    </StyledLabel>
  );
};

export default StartPriceInput;
