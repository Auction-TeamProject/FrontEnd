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
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
`;

export const BarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: rgb(255 212 0);
  border-radius: 10px;
`;
