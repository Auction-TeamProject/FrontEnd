import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ItemBids from '../components/itemDetail/ItemBids';
import ItemDescription from '../components/itemDetail/ItemDescription';
import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import { usePopupActon } from '../context/popupStore';
import { useUserState } from '../context/userStore';
import {
  MarginLessContainer,
  MarginLessContainerTitle,
} from '../styles/commonStyle';

export type BidType = {
  date: Date;
  description: string;
  bidder: string;
  price: number;
};

type ItemDetailData = {
  itemName: string;
  itemDescription: string;
  author: string;
  bids: Array<BidType>;
  photoUrl: string[];
  viewerCount: number;
  bidderCount: number;
  endDate: Date;
  bidIncrement: number;
} | null;

const ItemDetailPage = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [itemDetails, setItemDetails] = useState<ItemDetailData>(null);
  const { setDropDownArray } =
    useOutletContext<DropDownHeaderLayoutContextType>();
  const { user } = useUserState();
  const navigate = useNavigate();
  const { openPopup } = usePopupActon();

  useEffect(() => {
    //if (user === itemDetails?.author) {
    if (true) {
      setDropDownArray([
        {
          name: '글 수정',
          callback: () => {
            navigate(`edit`);
          },
        },
        {
          name: '글 삭제',
          callback: () => {
            openPopup(
              <DeleteModalDescription>
                <h3>정말 삭제할까요?</h3>
                <p>입찰이 시작된 이후 삭제할 수 없어요</p>
              </DeleteModalDescription>,
              () => {
                console.log('삭제 뮤테이트 함수 호출');
              }
            );
          },
        },
      ]);
    }
    return () => {
      setDropDownArray(undefined);
    };
  }, [navigate, openPopup, setDropDownArray]);

  useEffect(() => {
    // 가상 api 호출
    setItemDetails({
      itemName: itemId || '상품명',
      itemDescription: '상품 설명',
      author: '작성자',
      photoUrl: [],
      viewerCount: 0,
      bidderCount: 0,
      bidIncrement: 1000,
      bids: [
        {
          date: new Date(),
          price: 2000,
          description: '테스트1231231232312312331',
          bidder: '테스트1123',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
        {
          price: 1000,
          date: new Date(),
          description: '테스트',
          bidder: '테스트',
        },
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
        bidIncrement={itemDetails?.bidIncrement || 1000}
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
  font-size: var(--font-size-base);
`;

const DeleteModalDescription = styled.section`
  display: flex;
  flex-direction: column;
`;
