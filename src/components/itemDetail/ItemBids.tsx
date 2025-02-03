import { HTMLAttributes, useEffect, useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
import styled from 'styled-components';

import { BidType } from '../../pages/ItemDetailPage';
import {
  MarginLessContainer,
  MarginLessContainerTitle,
} from '../../styles/commonStyle';
import ReFreshButton from '../ReFreshButton';
import BidSheetModal from './BidSheetModal';

type ItemBidsProps = {
  bids: Array<BidType>;
  bidderCount: number;
  endDate: Date;
  bidIncrement: number;
} & HTMLAttributes<HTMLDivElement>;

const ItemBids = ({
  bids,
  bidderCount,
  endDate,
  bidIncrement,
  ...props
}: ItemBidsProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MarginLessContainer $flex={1} {...props}>
      <MarginLessContainerTitle>
        입찰 내역 <ReFreshButton />
      </MarginLessContainerTitle>
      <BidderCount>
        <IoMdPeople></IoMdPeople>
        현재 참여자 {bidderCount}명
      </BidderCount>
      <StyledUl>
        {bids.map((bid, index) => (
          <StyledLi key={index}>
            <Description>
              {bid.date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h23',
              })}
              -{bid.price}원-{bid.description}
            </Description>
            <Bidder>{bid.bidder}</Bidder>
          </StyledLi>
        ))}
      </StyledUl>
      <BidSheetModal
        currentTime={currentTime}
        endDate={endDate}
        startPrice={bids.length > 0 ? bids[0].price : 0}
        bidIncrement={bidIncrement}
      ></BidSheetModal>
    </MarginLessContainer>
  );
};

export default ItemBids;

const StyledUl = styled.ul`
  width: 100%;
  padding: 0 var(--marginless-container-padding);
  margin-top: 1rem;
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: var(--paddingless-page-container-gap) 0;
  font-weight: bold;
  color: var(--muted-text-color);
`;

const Description = styled.p`
  flex: 1;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Bidder = styled.p`
  margin: 0 var(--paddingless-page-container-gap);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BidderCount = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--marginless-container-padding);
  font-size: var(--font-size-small);
  color: var(--muted-text-color);
`;
