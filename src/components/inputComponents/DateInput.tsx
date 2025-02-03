import { HTMLAttributes } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import {
  InputComponentsDescription,
  StyledInput,
  StyledLabel,
} from '../../styles/commonStyle';

type DateInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  RegisterOptions: RegisterOptions<T>;
  placeholder?: string;
  inputTitle?: string;
  inputDescription?: string;
  register: UseFormRegister<T>;
} & HTMLAttributes<HTMLLabelElement>;

const DateInput = <T extends FieldValues>({
  fieldName,
  register,
  inputDescription,
  inputTitle,
  RegisterOptions,
  placeholder,
  ...props
}: DateInputProps<T>) => {
  return (
    <StyledLabel htmlFor={fieldName} {...props}>
      {inputTitle}
      <InputComponentsDescription>
        {inputDescription}
      </InputComponentsDescription>
      <StyledInput
        {...register(fieldName, RegisterOptions)}
        placeholder={placeholder ?? undefined}
        id={fieldName}
        type="datetime-local"
      ></StyledInput>
    </StyledLabel>
  );
};

export default DateInput;
