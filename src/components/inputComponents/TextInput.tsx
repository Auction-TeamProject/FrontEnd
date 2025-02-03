import { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
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

type TextInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  RegisterOptions: RegisterOptions<T>;
  placeholder?: string;
  inputTitle?: string;
  inputDescription?: string;
  inputType?: HTMLInputTypeAttribute;
  register: UseFormRegister<T>;
} & HTMLAttributes<HTMLLabelElement>;

const TextInput = <T extends FieldValues>({
  fieldName,
  register,
  inputDescription,
  inputTitle,
  inputType,
  RegisterOptions,
  placeholder,
  ...props
}: TextInputProps<T>) => {
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
        type={inputType ?? 'text'}
      ></StyledInput>
    </StyledLabel>
  );
};

export default TextInput;
