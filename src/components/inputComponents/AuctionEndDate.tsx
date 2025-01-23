import { HTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { StyledInput, StyledLabel } from '../../styles/commonStyle';

type AuctionEndDateProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
} & HTMLAttributes<HTMLLabelElement>;

const AuctionEndDate = <T extends FieldValues>({
  register,
  fieldName,
  ...props
}: AuctionEndDateProps<T>) => {
  return (
    <StyledLabel htmlFor={fieldName} {...props}>
      경매 종료 시간
      <StyledInput
        id={fieldName}
        type="datetime-local"
        {...register(fieldName, {
          required: {
            value: true,
            message: '경매 종료 시간을 입력해주세요',
          },
          validate: {
            withinOneYear: (value) => {
              const selectedDate = new Date(value);
              const currentDate = new Date();
              const oneYearLater = new Date();
              oneYearLater.setFullYear(currentDate.getFullYear() + 1);
              return (
                selectedDate <= oneYearLater ||
                '경매 종료 시간은 1년 이내여야 합니다.'
              );
            },
          },
        })}
      ></StyledInput>
    </StyledLabel>
  );
};

export default AuctionEndDate;
