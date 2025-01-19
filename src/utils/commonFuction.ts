import { ChangeEvent, Dispatch, SetStateAction } from 'react';

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

  return `${days > 0 ? days + '일' : ''} ${hours > 0 ? hours + ':' : ''}${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
};

/**
 * 이미지 파일을 선택했을 때 실행되는 함수
 *
 * @param {ChangeEvent<HTMLInputElement>} event
 * @param {Dispatch<SetStateAction<File[] | null>>} setImageState
 */
export const handleImageFileChange = (
  event: ChangeEvent<HTMLInputElement>,
  setImageState: Dispatch<SetStateAction<File[] | null>>
) => {
  const files = event.target.files;
  if (files) {
    const fileArray = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    );
    setImageState(fileArray);
  } else {
    alert('이미지 파일을 선택해주세요.');
  }
};
