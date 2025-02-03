import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type ExpandableItemProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const minHeight = 200;

const ExpandableItem = ({ children, ...props }: ExpandableItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isExpanded ? contentRef.current.scrollHeight : minHeight);
    }
  }, [isExpanded]);

  return (
    <ExpandableItemContainer {...props}>
      <OverflowContainer $maxHeight={maxHeight} ref={contentRef}>
        {children}
      </OverflowContainer>

      <button onClick={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? '접기' : '더보기'}
      </button>
    </ExpandableItemContainer>
  );
};

export default ExpandableItem;
const ExpandableItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const OverflowContainer = styled.div<{ $maxHeight: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;

  &::before {
    position: absolute;
    inset: 0;
    z-index: 1; /* 가상 요소가 내용물 뒤에 오도록 설정 */
    pointer-events: none;
    content: '';
    box-shadow: inset 0
      ${({ $maxHeight }) => ($maxHeight <= minHeight ? '-60px' : '0')}
      20px -20px white;
    transition: box-shadow 0.3s ease-in-out;
  }
`;
