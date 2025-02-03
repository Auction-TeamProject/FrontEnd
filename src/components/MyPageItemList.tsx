import { useId, useState } from 'react';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';
import styled from 'styled-components';

import ExpandableItem from './ExpandableItem';
import ItemList from './ItemList';

const MyPageItemList = () => {
  const [isChecked, setIsChecked] = useState(false);
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

      <ExpandableItem>
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
      </ExpandableItem>
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
