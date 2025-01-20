import { HTMLAttributes } from 'react';
import { FaRegHourglass } from 'react-icons/fa';
import { IoMdPeople } from 'react-icons/io';
import { LuEye } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ItemPhoto from './itemDetail/ItemPhoto';

type ItemPorps = {
  itemId: number;
  itemName: string;
  itemDescription: string;
  viewCount: number;
  imageUrl: string;
  bidderCount: number;
  endDate: Date;
} & HTMLAttributes<HTMLDivElement>;

const ItemList = ({
  itemId,
  itemName,
  bidderCount,
  imageUrl,
  itemDescription,
  viewCount,
  endDate,
  ...props
}: ItemPorps) => {
  const navigate = useNavigate();

  return (
    <ItemListContainer
      {...props}
      onClick={() => navigate('/item-detail/' + { itemId })}
    >
      <ItemPhoto alt="" src={imageUrl}></ItemPhoto>
      <ItemDescriptionContainer>
        <ItemName>{itemName || '상품이름'}</ItemName>
        <ItemEndDate>
          <FaRegHourglass />
          {endDate
            ? endDate.toLocaleDateString()
            : new Date().toLocaleDateString()}
        </ItemEndDate>
        <ItemDescription>
          {itemDescription || '설명 테스트 123123asdasdfasdfasdf123'}
        </ItemDescription>
        <EtcInfoContainer>
          <IoMdPeople />
          {bidderCount || 0}
          <LuEye />
          {viewCount || 0}
        </EtcInfoContainer>
      </ItemDescriptionContainer>
    </ItemListContainer>
  );
};

export default ItemList;

const ItemListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  width: 100%;
  cursor: pointer;
`;

const ItemDescriptionContainer = styled.div`
  position: relative;
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  overflow: hidden;
`;

const ItemName = styled.h3`
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: bold;
`;

const ItemDescription = styled.p`
  position: relative;
  flex: 1;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemEndDate = styled.p`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  font-size: var(--font-size-small);
  color: var(--muted-text-color);

  svg {
    margin: 0;
  }
`;

const EtcInfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  font-size: var(--font-size-small);
  color: var(--muted-text-color);

  svg {
    margin: 3px;
  }
`;
