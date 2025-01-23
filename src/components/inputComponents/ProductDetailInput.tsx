import { HTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { StyledLabel, StyledTextArea } from '../../styles/commonStyle';

type ProductDetailInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
} & HTMLAttributes<HTMLLabelElement>;

const ProductDetailInput = <T extends FieldValues>({
  register,
  fieldName,
  ...props
}: ProductDetailInputProps<T>) => {
  return (
    <StyledLabel htmlFor={fieldName} {...props}>
      상품설명
      <StyledTextArea
        rows={4}
        id={fieldName}
        {...register(fieldName, {
          required: { value: true, message: '상품설명을 입력해주세요' },
        })}
      ></StyledTextArea>
    </StyledLabel>
  );
};

export default ProductDetailInput;
