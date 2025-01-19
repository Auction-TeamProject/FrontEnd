import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import ItemPhoto from '../components/itemDetail/ItemPhoto';
import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import { useToastActions } from '../context/toastStore';
import {
  BarButton,
  FormContainer,
  StyledInput,
  StyledLabel,
} from '../styles/commonStyle';
import { handleImageFileChange } from '../utils/commonFuction';

type ItemRegisterFormType = {
  itemName: string;
  itemDescription: string;
  startPrice: number;
  bidIncrement: number;
  endTime: string;
  mainImage: File[];
  subImage: File[];
};

const ItemRegisterPage = () => {
  const { setHeaderTitle } =
    useOutletContext<DropDownHeaderLayoutContextType>();
  const { addToast } = useToastActions();

  useEffect(() => {
    setHeaderTitle('상품 등록');
    return () => {
      setHeaderTitle(null);
    };
  }, [setHeaderTitle]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ItemRegisterFormType>({ mode: 'all' });

  const [mainImage, setMainImage] = useState<File[] | null>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const [subImage, setSubImage] = useState<File[] | null>(null);
  const subImageRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (mainImage) setValue('mainImage', mainImage);
    if (subImage) setValue('subImage', subImage);
  }, [mainImage, setValue, subImage]);

  // 상품 등록 버튼 클릭 시 실행되는 함수
  const onSubmit = (data: ItemRegisterFormType) => {
    console.log(data);

    if (!data.mainImage || data.mainImage.length === 0) {
      console.log('mainImage', data.mainImage);
      setError('mainImage', {
        type: 'required',
        message: '대표 이미지는 필수로 등록해주세요',
      });
      return;
    }

    const formData = new FormData();
    // 텍스트 데이터 추가
    formData.append('itemName', data.itemName);
    formData.append('itemDescription', data.itemDescription);
    formData.append('startPrice', data.startPrice.toString());
    formData.append('bidIncrement', data.bidIncrement.toString());
    formData.append('endTime', data.endTime);

    // 파일 데이터 추가
    formData.append('mainImage', data.mainImage[0]);
    if (data.subImage)
      data.subImage.forEach((file, index) => {
        formData.append(`subImage${index}`, file);
      });
  };

  const onSubmitError = () => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        addToast(error.message, 'warning');
      }
    });
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <StyledLabel htmlFor="itemName">
          상품이름
          <StyledInput
            id="itemName"
            {...register('itemName', {
              required: { value: true, message: '상품이름을 입력해주세요' },
            })}
          ></StyledInput>
        </StyledLabel>

        <StyledLabel htmlFor="itemDescription">
          상품설명
          <StyledInput
            id="itemDescription"
            {...register('itemDescription', {
              required: { value: true, message: '상품설명을 입력해주세요' },
            })}
          ></StyledInput>
        </StyledLabel>

        <StyledLabel htmlFor="startPrice">
          판매 시작 가격
          <StyledInput
            placeholder="시작 가격을 입력해주세요"
            type="number"
            id="startPrice"
            {...register('startPrice', {
              required: { value: true, message: '시작 가격을 입력해주세요' },
            })}
          ></StyledInput>
        </StyledLabel>

        <StyledLabel htmlFor="bidIncrement">
          입찰 가격 조정 단위
          <StyledInput
            placeholder="경매 참여시 조정될 가격을 입력해주세요"
            type="number"
            id="bidIncrement"
            {...register('bidIncrement', {
              required: {
                value: true,
                message: '경매 참여시 조정될 가격을 입력해주세요',
              },
            })}
          ></StyledInput>
        </StyledLabel>

        <StyledLabel htmlFor="endTime">
          경매 종료 시간
          <StyledInput
            id="endTime"
            type="datetime-local"
            {...register('endTime', {
              required: {
                value: true,
                message: '경매 종료 시간을 입력해주세요',
              },
              validate: {
                withinOneYear: (value) => {
                  const selectedDate = new Date(value);
                  const currentDate = new Date();
                  const oneYearLater = new Date();
                  oneYearLater.setFullYear(currentDate.getFullYear() + 1);
                  return (
                    selectedDate <= oneYearLater ||
                    '경매 종료 시간은 1년 이내여야 합니다.'
                  );
                },
              },
            })}
          ></StyledInput>
        </StyledLabel>

        <StyledLabel htmlFor="mainImage">
          상품 대표 이미지 등록
          <LabelDescription>
            게시글에 표시될 대표 이미지를 등록해주세요
          </LabelDescription>
          <HideInput
            type="file"
            onChange={(e) => handleImageFileChange(e, setMainImage)}
            ref={mainImageRef}
          ></HideInput>
          <PhotoInputButton
            type="button"
            onClick={() => mainImageRef.current?.click()}
          >
            <PhotoGridOutter>
              <ItemPhoto
                alt="mainImage"
                src={
                  mainImage && mainImage[0]
                    ? URL.createObjectURL(mainImage[0])
                    : undefined
                }
              ></ItemPhoto>
            </PhotoGridOutter>
          </PhotoInputButton>
        </StyledLabel>

        <StyledLabel htmlFor="subImage">
          상품 이미지 추가 등록
          <LabelDescription>
            상품 설명에 추가로 필요한 이미지가 있다면 등록해주세요
          </LabelDescription>
          <HideInput
            type="file"
            onChange={(e) => handleImageFileChange(e, setSubImage)}
            multiple
            ref={subImageRef}
          ></HideInput>
          <PhotoInputButton
            type="button"
            onClick={() => subImageRef.current?.click()}
          >
            {subImage && subImage.length > 0 ? (
              subImage.map((image, index) => (
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
        <BarButton type="submit">등록</BarButton>
      </FormContainer>
    </PageContainer>
  );
};

export default ItemRegisterPage;

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--item-detail-page-gap);
  width: 100%;
  height: 100%;
  padding: 5% 10%;
  background-color: white;

  --item-detail-page-gap: 8px;
`;

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
  gap: var(--item-detail-page-gap);
  width: 100%;
`;

const PhotoGridOutter = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;
