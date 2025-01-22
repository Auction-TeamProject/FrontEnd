import { useId, useState } from 'react';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';
import styled from 'styled-components';

import ItemList from './ItemList';

const MyPageItemList = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const uniqueId = useId();

  return (
    <>
      <CheckboxContanier>
        <StyledCheckBox
          type="checkbox"
          onChange={(e) => setIsChecked(e.target.checked)}
          checked={isChecked}
          id={`checkbox-${uniqueId}`} // 고유한 id 적용
        ></StyledCheckBox>
        <StyledInputLabel htmlFor={`checkbox-${uniqueId}`}>
          {isChecked ? <MdOutlineCheckBox /> : <MdCheckBoxOutlineBlank />}
          진행중만 보기
        </StyledInputLabel>
      </CheckboxContanier>

      <OverflowContainer $isExpanded={isExpanded}>
        {[...Array(4)].map((_item, itemIndex) => (
          <ItemList
            key={itemIndex}
            bidderCount={0}
            endDate={new Date()}
            imageUrl=""
            itemDescription={'설명 테스트 123123asdasdfasdfasdf123'}
            itemId={123}
            itemName={itemIndex.toString()}
            viewCount={10}
          />
        ))}
      </OverflowContainer>
      <button onClick={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? '접기' : '더보기'}
      </button>
    </>
  );
};

export default MyPageItemList;

const CheckboxContanier = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  margin: var(--marginless-container-padding);
`;

const StyledCheckBox = styled.input`
  display: none;
`;

const StyledInputLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-small);
  color: var(--muted-text-color);
  cursor: pointer;
`;

const OverflowContainer = styled.div<{ $isExpanded: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  ${({ $isExpanded }) =>
    $isExpanded ? 'max-height: 100%;' : 'max-height: 200px;'}
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  &::before {
    position: absolute;
    inset: 0;
    z-index: 1; /* 가상 요소가 내용물 뒤에 오도록 설정 */
    pointer-events: none;
    content: '';
    box-shadow: inset 0 ${({ $isExpanded }) => ($isExpanded ? '0' : '-60px')}
      20px -20px white;
    transition: box-shadow 0.3s ease-in-out;
  }
`;
