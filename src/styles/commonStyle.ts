import styled from 'styled-components';

type MarginLessContainerProps = {
  $direction?: 'row' | 'column';
  $flex?: number;
};

export const MarginLessContainer = styled.section<MarginLessContainerProps>`
  position: relative;
  display: flex;
  flex: ${({ $flex }) => $flex || 0};
  flex-direction: ${({ $direction }) => $direction || 'column'};
  width: 100%;
  padding: var(--marginless-container-padding);
  margin: 0;
  background-color: white;
  border-radius: 10px;

  --marginless-container-padding: 20px;
`;

export const MarginLessContainerTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: 700;
`;

export const BarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  font-size: var(--font-size-medium);
  font-weight: bold;
  color: white;
  background-color: var(--primary-color);
  border-radius: 10px;
`;

export const StyledInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  font-size: var(--font-size-base);
  background-color: var(--background-color);
  border-radius: 10px;
`;

export const StyledTextArea = styled.textarea`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 7rem;
  padding: 0.5rem;
  font-size: var(--font-size-base);
  resize: none;
  background-color: var(--background-color);
  border: none;
  border-radius: 10px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ErrorDescription = styled.p`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 1rem;
  font-size: var(--font-size-small);
  font-weight: normal;
  color: var(--muted-text-color);
`;

export const InputSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10%;
`;

export const StyledLabel = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: bold;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

export const FlexibleBarButton = styled(BarButton)`
  flex: 1;
`;
