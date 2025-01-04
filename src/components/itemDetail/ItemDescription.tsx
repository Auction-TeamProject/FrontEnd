import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import testImg from '../../assets/react.svg';
import {
  MarginLessContainer,
  MarginLessContainerTitle,
} from '../../styles/commonStyle';
import ItemPhoto from './ItemPhoto';

type ItemDescriptionProps = {
  itemDescription: string;
  photoUrl: string[];
  viewerCount: number;
} & HTMLAttributes<HTMLDivElement>;

const ItemDescription = ({
  itemDescription,
  photoUrl,
  viewerCount,
  ...props
}: ItemDescriptionProps) => {
  return (
    <PaddingLessContainer {...props}>
      <MarginContaniner>
        <MarginLessContainerTitle>상품 설명</MarginLessContainerTitle>
        <TextContainer>{itemDescription}</TextContainer>
        <ViewerContainer>
          <ViewerIcon src={testImg} /> {viewerCount}명 조회
        </ViewerContainer>
      </MarginContaniner>
      <PhotoContainer>
        {[...Array(4)].map((_photo, index) => (
          <ItemPhoto
            key={index}
            src={photoUrl?.[index]}
            alt={`${index}번 사진`}
          />
        ))}
      </PhotoContainer>
    </PaddingLessContainer>
  );
};

export default ItemDescription;

const PaddingLessContainer = styled(MarginLessContainer)`
  padding: 0;
`;

const MarginContaniner = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--marginless-container-padding)
    var(--marginless-container-padding) 0;
`;

const TextContainer = styled.p`
  display: flex;
  align-items: flex-start;
  justify-content: start;
  min-height: 100px;
  margin: var(--item-detail-page-gap) 0;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--item-detail-page-gap);
  align-items: center;
  justify-content: start;
  width: 100%;
  min-height: 100px;
  padding: var(--item-detail-page-gap);
  overflow-x: auto;
`;

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: var(--item-detail-page-gap) 0;
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
