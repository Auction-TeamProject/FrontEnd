import { HTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { StyledInput, StyledLabel } from '../../styles/commonStyle';

type BidStepInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
} & HTMLAttributes<HTMLLabelElement>;

const BidStepInput = <T extends FieldValues>({
  register,
  fieldName,
  ...props
}: BidStepInputProps<T>) => {
  return (
    <StyledLabel htmlFor={fieldName} {...props}>
      입찰 가격 조정 단위
      <StyledInput
        placeholder="경매 참여시 조정될 가격을 입력해주세요"
        type="number"
        id={fieldName}
        {...register(fieldName, {
          required: {
            value: true,
            message: '경매 참여시 조정될 가격을 입력해주세요',
          },
        })}
      ></StyledInput>
    </StyledLabel>
  );
};

export default BidStepInput;
