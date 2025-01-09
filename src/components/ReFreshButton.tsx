import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiRefresh } from 'react-icons/hi';
import styled, { css, keyframes } from 'styled-components';

const maxCount = 30;

const ReFreshButton = () => {
  const progressControls = useAnimation();
  const [count, setCount] = useState(maxCount);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count < 1) {
      setCount(maxCount);
    }

    return () => clearTimeout(timer);
  }, [count]);

  //시간초과시 애니메이션 새로고침
  useEffect(() => {
    if (count === maxCount) {
      progressControls.set({ width: '100%' });
      progressControls.start({ width: 0, transition: { duration: maxCount } });
    }
  }, [count, progressControls]);

  /** 새로고침 버튼 핸들러*/
  const handleRefresh = () => {
    setCount(maxCount);
    progressControls.set({ width: '100%' });
    progressControls.start({ width: 0, transition: { duration: maxCount } });
  };

  return (
    <Button onClick={handleRefresh}>
      <ProgressBar
        as={motion.div}
        initial={{ width: '100%' }}
        animate={progressControls}
      ></ProgressBar>
      <Fragment>
        <RefreshIcon $animate={count === 30} />
        <Timer>{count}</Timer>
      </Fragment>
    </Button>
  );
};

export default ReFreshButton;

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 var(--item-detail-page-gap);
  margin: 0 var(--item-detail-page-gap);
  overflow: hidden;
  background-color: var(--background-color);
  border-radius: 1rem;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RefreshIcon = styled(HiRefresh)<{ $animate: boolean }>`
  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${rotate} 0.5s linear;
    `}
`;

const Fragment = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
`;

const Timer = styled.span`
  min-width: 1.5rem;
  font-size: var(--font-size-xsmall);
  font-weight: normal;
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
  transition: width 0.1s;
`;
