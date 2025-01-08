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
