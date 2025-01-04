import { HTMLAttributes, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import testImg from '../../assets/react.svg';

type ItemPhotoProps = {
  src?: string;
  alt: string;
} & HTMLAttributes<HTMLImageElement>;

const ItemPhoto = ({ src, alt, ...props }: ItemPhotoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoaded(false);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <>
      {!isLoaded || !src ? (
        <EmptyPhoto {...props}>
          <PhotoIcon src={testImg}></PhotoIcon>
        </EmptyPhoto>
      ) : (
        <Photo {...props} src={src} alt={alt} loading="lazy" />
      )}
    </>
  );
};

export default ItemPhoto;

const Photo = styled.img`
  display: flex;
  flex: 1;
  place-self: center center;
  min-width: 0;
  min-height: 0;
  aspect-ratio: 1 / 1;
  margin: 0;
  background-color: var(--background-color);
  border: none;
  border-radius: 8px;
`;

const EmptyPhoto = styled.div`
  display: flex;
  flex: 1;
  place-self: center center;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  margin: 0;
  background-color: var(--background-color);
  border: none;
  border-radius: 8px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const PhotoIcon = styled.img`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  max-width: 50%;
  animation: ${rotate} 2s linear infinite;
`;
