import {
  forwardRef,
  HTMLAttributes,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { StyledLabel } from '../../styles/commonStyle';
import { handleImageFileChange } from '../../utils/commonFuction';
import ItemPhoto from '../itemDetail/ItemPhoto';

type PhotoInputProps = {
  multiple?: boolean;
  labelTitle: string;
  labelDescription: string;
} & HTMLAttributes<HTMLLabelElement>;

export type PhotoInputRefProps = {
  image: File[] | null;
};

const PhotoInput = forwardRef<PhotoInputRefProps, PhotoInputProps>(
  ({ multiple, labelTitle, labelDescription, ...props }, ref) => {
    const ImageRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File[] | null>(null);
    const uniqueId = useId();

    useImperativeHandle(
      ref,
      () => ({
        image: image,
      }),
      [image]
    );

    return (
      <StyledLabel htmlFor={uniqueId} {...props}>
        {labelTitle}
        <LabelDescription>{labelDescription}</LabelDescription>
        <HideInput
          type="file"
          onChange={(e) => handleImageFileChange(e, setImage)}
          id={uniqueId}
          multiple={multiple ?? false}
          ref={ImageRef}
        ></HideInput>
        <PhotoInputButton
          type="button"
          onClick={() => ImageRef.current?.click()}
        >
          {image && image.length > 0 ? (
            image.map((image, index) => (
              <PhotoGridOutter key={index}>
                <ItemPhoto
                  alt={`subImage-${index}`}
                  src={image ? URL.createObjectURL(image) : undefined}
                />
              </PhotoGridOutter>
            ))
          ) : (
            <PhotoGridOutter>
              <ItemPhoto alt="subImage"></ItemPhoto>
            </PhotoGridOutter>
          )}
        </PhotoInputButton>
      </StyledLabel>
    );
  }
);

PhotoInput.displayName = 'PhotoInput';
export default PhotoInput;

const LabelDescription = styled.p`
  position: relative;
  margin: 0;
  font-size: var(--font-size-small);
  font-weight: normal;
`;

const HideInput = styled.input`
  display: none;
`;

const PhotoInputButton = styled.button`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--paddingless-page-container-gap);
  width: 100%;
`;

const PhotoGridOutter = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;
