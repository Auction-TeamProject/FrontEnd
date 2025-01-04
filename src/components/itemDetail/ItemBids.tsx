import { HTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';

import testImg from '../../assets/react.svg';
import { BidType } from '../../pages/ItemDetailPage';
import {
  BarButton,
  MarginLessContainer,
  MarginLessContainerTitle,
} from '../../styles/commonStyle';
import { convertMillisecondsToTime } from '../../utils/commonFuction';

type ItemBidsProps = {
  bids: Array<BidType>;
  bidderCount: number;
  endDate: Date;
} & HTMLAttributes<HTMLDivElement>;

const ItemBids = ({ bids, bidderCount, endDate, ...props }: ItemBidsProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MarginLessContainer $flex={1} {...props}>
      <MarginLessContainerTitle>입찰 내역</MarginLessContainerTitle>
      <BidderCount>
        <ViewerIcon src={testImg} />
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
              -{bid.description}
            </Description>
            <Bidder>{bid.bidder}</Bidder>
          </StyledLi>
        ))}
      </StyledUl>
      <StickyButtonContainer>
        <EndDate>
          ⌛️종료까지 남은시간
          {convertMillisecondsToTime(
            Math.abs(endDate.getTime() - currentTime.getTime())
          )}
        </EndDate>
        <BarButton>경매 참여</BarButton>
      </StickyButtonContainer>
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
  margin: var(--item-detail-page-gap) 0;
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
  margin: 0 var(--item-detail-page-gap);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EndDate = styled.p`
  display: flex;
  gap: var(--item-detail-page-gap);
  align-items: center;
  justify-content: flex-end;
  margin-left: 0;
  color: var(--muted-text-color);
`;

const StickyButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 var(--marginless-container-padding);
  background-color: white;
`;

const BidderCount = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  margin: var(--marginless-container-padding);
  color: var(--muted-text-color);
`;

const ViewerIcon = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  margin: 0 var(--item-detail-page-gap);
`;
