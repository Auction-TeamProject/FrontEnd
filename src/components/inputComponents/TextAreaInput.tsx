import { HTMLAttributes } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import {
  InputComponentsDescription,
  StyledLabel,
  StyledTextArea,
} from '../../styles/commonStyle';

type TextAraInputProps<T extends FieldValues> = {
  fieldName: Path<T>;
  RegisterOptions: RegisterOptions<T>;
  placeholder?: string;
  inputTitle?: string;
  inputDescription?: string;
  register: UseFormRegister<T>;
  textareaRows?: number;
} & HTMLAttributes<HTMLLabelElement>;

const TextAraInput = <T extends FieldValues>({
  fieldName,
  register,
  inputDescription,
  inputTitle,
  RegisterOptions,
  placeholder,
  textareaRows,
  ...props
}: TextAraInputProps<T>) => {
  return (
    <StyledLabel htmlFor={fieldName} {...props}>
      {inputTitle}
      <InputComponentsDescription>
        {inputDescription}
      </InputComponentsDescription>
      <StyledTextArea
        rows={textareaRows ?? 4}
        {...register(fieldName, RegisterOptions)}
        placeholder={placeholder ?? undefined}
        id={fieldName}
      ></StyledTextArea>
    </StyledLabel>
  );
};

export default TextAraInput;
