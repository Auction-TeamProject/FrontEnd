/**
 * 밀리초 단위 숫자를 일 시간 분 초로 변환해주는 함수
 *
 * @param {number} milliseconds
 * @returns {string}
 */
export const convertMillisecondsToTime = (milliseconds: number) => {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return `${days > 0 ? days + '일' : ''} ${hours > 0 ? hours + ':' : ''}${minutes}:${seconds}`;
};
