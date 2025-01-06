import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ItemBids from '../components/itemDetail/ItemBids';
import ItemDescription from '../components/itemDetail/ItemDescription';
import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import {
  MarginLessContainer,
  MarginLessContainerTitle,
} from '../styles/commonStyle';

export type BidType = { date: Date; description: string; bidder: string };

type ItemDetailData = {
  itemName: string;
  itemDescription: string;
  bids: Array<BidType>;
  photoUrl: string[];
  viewerCount: number;
  bidderCount: number;
  endDate: Date;
} | null;

const ItemDetailPage = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [itemDetails, setItemDetails] = useState<ItemDetailData>(null);
  const { setDropDownArray } =
    useOutletContext<DropDownHeaderLayoutContextType>();

  useEffect(() => {
    setDropDownArray([
      {
        name: '글 수정',
        callback: () => {
          console.log('테스트1');
        },
      },
      {
        name: '글 삭제',
        callback: () => {
          console.log('테스트2');
        },
      },
    ]);
    return () => {
      setDropDownArray(undefined);
    };
  }, [setDropDownArray]);

  useEffect(() => {
    // 가상 api 호출
    setItemDetails({
      itemName: itemId || '상품명',
      itemDescription: '상품 설명',
      photoUrl: [],
      viewerCount: 0,
      bidderCount: 0,
      bids: [
        {
          date: new Date(),
          description: '테스트1231231232312312331',
          bidder: '테스트1123',
        },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
        { date: new Date(), description: '테스트', bidder: '테스트' },
      ],
      endDate: new Date(),
    });
  }, [itemId]);

  return (
    <PageContainer>
      <MarginLessContainer $direction="row">
        <MarginLessContainerTitle>상품명</MarginLessContainerTitle>
        <ItemName>{itemDetails?.itemName}</ItemName>
      </MarginLessContainer>
      <ItemDescription
        itemDescription={itemDetails?.itemDescription || ''}
        photoUrl={itemDetails?.photoUrl || []}
        viewerCount={itemDetails?.viewerCount || 0}
      />
      <ItemBids
        bids={itemDetails?.bids || []}
        bidderCount={itemDetails?.bidderCount || 0}
        endDate={itemDetails?.endDate || new Date()}
      />
    </PageContainer>
  );
};

export default ItemDetailPage;

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--item-detail-page-gap);
  width: 100%;
  height: 100%;
  margin-top: var(--item-detail-page-gap);

  --item-detail-page-gap: 8px;
`;

const ItemName = styled.p`
  padding: 0;
  margin: 0;
  margin-left: 1rem;
  font-size: 1rem;
`;
