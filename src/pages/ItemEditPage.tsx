import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';

import AuctionEndDate from '../components/inputComponents/AuctionEndDate';
import BidStepInput from '../components/inputComponents/BidStepInput';
import PhotoInput, {
  PhotoInputRefProps,
} from '../components/inputComponents/PhotoInput';
import ProductDetailInput from '../components/inputComponents/ProductDetailInput';
import ProductNameInput from '../components/inputComponents/ProductNameInput';
import StartPriceInput from '../components/inputComponents/StartPriceInput';
import { DropDownHeaderLayoutContextType } from '../components/layout/DropDownHeaderBarLayout';
import { useToastActions } from '../context/toastStore';
import {
  BarButton,
  FormContainer,
  PaddinglessPageContainer,
} from '../styles/commonStyle';

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
    formState: { errors },
  } = useForm<ItemEditFormType>({ mode: 'onSubmit' });

  const mainImageRef = useRef<PhotoInputRefProps>(null);
  const subImageRef = useRef<PhotoInputRefProps>(null);

  // 상품 등록 버튼 클릭 시 실행되는 함수
  const onSubmit = (data: ItemEditFormType) => {
    const formData = new FormData();
    // 텍스트 데이터 추가
    formData.append('productName', data.productName);
    formData.append('productDetail', data.productDetail);
    formData.append('startPrice', data.startPrice.toString());
    formData.append('bidStep', data.bidStep.toString());
    formData.append('auctionEndDate', data.auctionEndDate);

    if (!mainImageRef.current?.image) {
      addToast('대표 이미지를 등록해주세요', 'warning');
      return;
    }
    // 파일 데이터 추가
    formData.append('mainImage', mainImageRef.current?.image[0]);
    if (subImageRef.current?.image) {
      subImageRef.current?.image.forEach((file, index) => {
        formData.append(`subImage${index}`, file);
      });
    }
  };

  //유효성 검사 실패 시 토스트 메시지 출력
  const onSubmitError = () => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        addToast(error.message, 'warning');
      }
    });
  };

  return (
    <PaddinglessPageContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <ProductNameInput register={register} fieldName="productName" />
        <ProductDetailInput register={register} fieldName="productDetail" />
        <StartPriceInput register={register} fieldName="startPrice" />
        <BidStepInput register={register} fieldName="bidStep" />
        <AuctionEndDate register={register} fieldName="auctionEndDate" />
        <PhotoInput
          ref={mainImageRef}
          labelTitle="상품 대표 이미지 등록"
          labelDescription="게시글에 표시될 대표이미지를 등록해주세요"
        />
        <PhotoInput
          multiple
          ref={subImageRef}
          labelTitle="상품 이미지 추가 등록"
          labelDescription="상품 설명에 추가로 필요한 이미지가 있다면 등록해주세요"
        />

        <BarButton type="submit">등록 완료</BarButton>
      </FormContainer>
    </PaddinglessPageContainer>
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
