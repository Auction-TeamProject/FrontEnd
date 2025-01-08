import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaRegHourglass } from 'react-icons/fa';
import styled from 'styled-components';

import { BarButton } from '../../styles/commonStyle';
import { convertMillisecondsToTime } from '../../utils/commonFuction';

type BidSheetModalProps = {
  endDate: Date;
  currentTime: Date;
  startPrice: number;
  bidIncrement: number;
};

const BidSheetModal = ({
  endDate,
  currentTime,
  startPrice,
  bidIncrement,
}: BidSheetModalProps) => {
  const [count, setCount] = useState(0);
  const [showBidSheet, setShowBidSheet] = useState(false);
  const bidContainerRef = useRef<HTMLDivElement>(null);

  const countDecreaseHandler = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    } else {
      setShowBidSheet(false);
    }
  };

  const countIncreaseHandler = () => {
    setCount((prev) => prev + 1);
  };

  const barButtonHandler = () => {
    setShowBidSheet(true);
  };

  const [height, setHeight] = useState('0px');
  useEffect(() => {
    if (bidContainerRef.current) {
      const computedStyle = getComputedStyle(bidContainerRef.current); //인라인 스타일이 아닌 방법으로 높이를 가져오기 위해 getComputedStyle 사용
      setHeight(computedStyle.height);
    } else {
      setHeight('0px');
    }
  }, [showBidSheet]);

  return (
    <StickyButtonContainer $showShadow={showBidSheet}>
      <AnimatePresence>
        <motion.div
          style={{ width: '100%', overflow: 'hidden' }}
          initial={{ height: 0 }}
          animate={{ height: height || '0px' }}
          exit={{ height: 0 }}
        >
          {showBidSheet && (
            <BidContainer ref={bidContainerRef}>
              <BidSheetHeader>얼마에 입찰할까요?</BidSheetHeader>
              <CloseButton onClick={() => setShowBidSheet(false)}>
                X
              </CloseButton>
              <EtcPriceContainer>
                <p>시작가 {startPrice}원</p>
                <p>|</p>
                <p>조정단위 {bidIncrement}원</p>
              </EtcPriceContainer>
              <ButtonContainer>
                <Button onClick={countDecreaseHandler}>-</Button>
                <MoneyContainer>
                  {count < 5 ? (
                    <>
                      <Money $count={0}>{startPrice}</Money>
                      <AnimatePresence>
                        {[...Array(count)].map((_, index) => (
                          <Fragment
                            as={motion.div}
                            style={{
                              width: '100%',
                              overflow: 'hidden',
                              position: 'absolute',
                            }}
                            initial={{ top: '-100px' }}
                            animate={{ top: '0px' }}
                            exit={{ top: '-100px' }}
                            key={index}
                          >
                            <Money key={index} $count={index + 1}>
                              {bidIncrement}
                            </Money>
                          </Fragment>
                        ))}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Money>{bidIncrement * count + startPrice}</Money>
                  )}
                </MoneyContainer>
                <Button onClick={countIncreaseHandler}>+</Button>
              </ButtonContainer>
            </BidContainer>
          )}
        </motion.div>
      </AnimatePresence>
      <EndDate>
        <FaRegHourglass />
        종료까지 남은시간
        {convertMillisecondsToTime(
          Math.abs(endDate.getTime() - currentTime.getTime())
        )}
      </EndDate>
      <BarButton onClick={barButtonHandler}>
        {bidIncrement * count + startPrice}원 입찰{' '}
        {showBidSheet ? '확정하기' : '하기'}
      </BarButton>
    </StickyButtonContainer>
  );
};

export default BidSheetModal;

const StickyButtonContainer = styled.div<{ $showShadow?: boolean }>`
  position: sticky;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 var(--marginless-container-padding)
    var(--marginless-container-padding);
  margin-bottom: calc(-1 * var(--marginless-container-padding));
  background-color: white;
  ${({ $showShadow }) =>
    $showShadow &&
    `
  box-shadow: 0 -20px 20px -20px rgb(0 0 0 / 30%);`}
`;

const BidSheetHeader = styled.h3`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0 0.5rem;
  font-size: var(--font-size-medium);
  font-weight: bold;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  margin: 1rem;
  font-size: var(--font-size-base);
  font-weight: bold;
`;

const EndDate = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 0;
  font-size: var(--font-size-xsmall);
  color: var(--muted-text-color);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--item-detail-page-gap);
  width: 100%;
  padding: 1rem;
`;

const MoneyContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 6rem;
  overflow: hidden;
  background-color: gray;
  border-radius: 10px;
`;

const Fragment = styled(motion.div)`
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  width: inherit;
  height: inherit;
`;

const Money = styled.div<{ $count?: number }>`
  position: relative;
  z-index: 1;
  width: auto;
  height: auto;
  padding: 15px 25px;
  margin: -50px;
  font-weight: bold;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  ${({ $count }) =>
    $count !== undefined &&
    `
    transform: translateY(${$count * -6}px);
  `}
`;

const Button = styled.button<{ $color?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin: auto;
  font-weight: bold;
  color: ${({ $color }) => $color || 'gray'};
  border-color: ${({ $color }) => $color || 'gray'};
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
`;

const BidContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const EtcPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: flex-start;
  margin: 0;
  font-size: var(--font-size-xsmall);
  color: var(--muted-text-color);

  p {
    margin: 0;
  }
`;
