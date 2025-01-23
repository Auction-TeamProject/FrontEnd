import { HTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { StyledInput, StyledLabel } from '../../styles/commonStyle';

type ProductInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
} & HTMLAttributes<HTMLLabelElement>;

const ProductNameInput = <T extends FieldValues>({
  register,
  fieldName,
  ...props
}: ProductInputProps<T>) => {
  return (
    <StyledLabel {...props} htmlFor={fieldName}>
      상품이름
      <StyledInput
        id={fieldName}
        {...register(fieldName, {
          required: { value: true, message: '상품이름을 입력해주세요' },
        })}
      ></StyledInput>
    </StyledLabel>
  );
};

export default ProductNameInput;
