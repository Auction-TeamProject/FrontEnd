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

type ItemEditFormType = {
  productName: string;
  productDetail: string;
  startPrice: number;
  bidStep: number;
  auctionEndDate: string;
  mainImage: File[];
  subImage: File[];
};

const ItemEditPage = () => {
  const { setHeaderTitle } =
    useOutletContext<DropDownHeaderLayoutContextType>();
  const { addToast } = useToastActions();

  useEffect(() => {
    setHeaderTitle('상품 수정');
    return () => {
      setHeaderTitle(null);
    };
  }, [setHeaderTitle]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ItemEditFormType>({ mode: 'onSubmit' });

  const [mainImage, setMainImage] = useState<File[] | null>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const [subImage, setSubImage] = useState<File[] | null>(null);
  const subImageRef = useRef<HTMLInputElement>(null);

  // 상품 등록 버튼 클릭 시 실행되는 함수
  const onSubmit = (data: ItemEditFormType) => {
    const formData = new FormData();
    // 텍스트 데이터 추가
    formData.append('productName', data.productName);
    formData.append('productDetail', data.productDetail);
    formData.append('startPrice', data.startPrice.toString());
    formData.append('bidStep', data.bidStep.toString());
    formData.append('auctionEndDate', data.auctionEndDate);

    if (!mainImage) {
      addToast('대표 이미지를 등록해주세요', 'warning');
      return;
    }
    // 파일 데이터 추가
    formData.append('mainImage', data.mainImage[0]);
    if (data.subImage)
      data.subImage.forEach((file, index) => {
        formData.append(`subImage${index}`, file);
      });
  };

  //유효성 검사 실패 시 토스트 메시지 출력
  const onSubmitError = () => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        addToast(error.message, 'warning');
      }
    });
  };

  // 이미지 파일이 변경될 때마다 상태 업데이트
  useEffect(() => {
    if (mainImage) setValue('mainImage', mainImage);
    if (subImage) setValue('subImage', subImage);
  }, [mainImage, setValue, subImage]);

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <StyledLabel htmlFor="productName">
          상품이름
          <StyledInput
            id="productName"
            {...register('productName', {
              required: { value: true, message: '상품이름을 입력해주세요' },
            })}
          ></StyledInput>
        </StyledLabel>

        <StyledLabel htmlFor="productDetail">
          상품설명
          <StyledInput
            id="productDetail"
            {...register('productDetail', {
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

        <StyledLabel htmlFor="bidStep">
          입찰 가격 조정 단위
          <StyledInput
            placeholder="경매 참여시 조정될 가격을 입력해주세요"
            type="number"
            id="bidStep"
            {...register('bidStep', {
              required: {
                value: true,
                message: '경매 참여시 조정될 가격을 입력해주세요',
              },
            })}
          ></StyledInput>
        </StyledLabel>

        <StyledLabel htmlFor="auctionEndDate">
          경매 종료 시간
          <StyledInput
            id="auctionEndDate"
            type="datetime-local"
            {...register('auctionEndDate', {
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
        <BarButton type="submit">수정 완료</BarButton>
      </FormContainer>
    </PageContainer>
  );
};

export default ItemEditPage;

export const fetchRegisterItem = async (formData: FormData) => {
  const token = sessionStorage.getItem('accessToken');
  const response = await fetch(
    import.meta.env.VITE_BACKEND_API_URL + '/login',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

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
