import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import styled from 'styled-components';

import { DropdownType } from '../components/DropDown';
import FilterDropDown from '../components/FilterDropDown';
import ItemList from '../components/ItemList';
import SearchBar from '../components/SearchBar';

type Item = {
  id: number;
  productName: string;
  productDetail: string;
  startPrice: number;
  bidStep: number;
  auctionEndDate: string;
  productStatus: string | null;
  createdAt: string | null;
  updatedAt: string;
  viewCount: number;
};

type PaginatedResponse<T> = {
  items: Array<T>;
  nextCursor: number | null;
};

//드롭다운 키 역할 enum객체
enum Order {
  BIDDER_COUNT,
  END_DATE,
  VIEW_COUNT,
  REGISTERED_DATE,
}
//드롭다운 출력용
const orderNameArray: { [key in Order]: string } = {
  [Order.BIDDER_COUNT]: '높은 참여자 순',
  [Order.END_DATE]: '빠른 마감일 순',
  [Order.VIEW_COUNT]: '높은 조회수 순',
  [Order.REGISTERED_DATE]: '최근 등록일 순',
};
//쿼리스트링 포함용
const orderQueryArray: { [key in Order]: string } = {
  [Order.BIDDER_COUNT]: 'bidder-count',
  [Order.END_DATE]: 'end-date',
  [Order.VIEW_COUNT]: 'view-count',
  [Order.REGISTERED_DATE]: 'created-date',
};

const HomePage = () => {
  const [order, setOrder] = useState<Order>(Order.REGISTERED_DATE);
  const [SearchInputValue, setSearchInputValue] = useState<string>();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['items', SearchInputValue, order],
    queryFn: ({ pageParam = 1 }) =>
      fetchItem(pageParam, SearchInputValue, orderQueryArray[order]),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const dropDownArray: DropdownType[] = [
    {
      callback: () => setOrder(Order.REGISTERED_DATE),
      name: orderNameArray[Order.REGISTERED_DATE],
    },
    {
      callback: () => setOrder(Order.BIDDER_COUNT),
      name: orderNameArray[Order.BIDDER_COUNT],
    },
    {
      callback: () => setOrder(Order.VIEW_COUNT),
      name: orderNameArray[Order.VIEW_COUNT],
    },
    {
      callback: () => setOrder(Order.END_DATE),
      name: orderNameArray[Order.END_DATE],
    },
  ];

  return (
    <HomePageContainer>
      <SearchBar setSearchInputValue={setSearchInputValue}></SearchBar>
      <FilterDropDown dropDownArray={dropDownArray}>
        {orderNameArray[order]}
        <IoIosArrowDown />
      </FilterDropDown>
      <ItemListContainer>
        {data?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.items.map((item, itemIndex) => (
              <ItemList
                key={itemIndex}
                bidderCount={0}
                endDate={new Date(item.auctionEndDate)}
                imageUrl=""
                itemDescription={item.productDetail}
                itemId={item.id}
                itemName={item.productName}
                viewCount={item.viewCount}
              />
            ))}
          </Fragment>
        ))}

        {/* 테스트 렌더링용 */}
        {[...Array(12)].map((_item, itemIndex) => (
          <ItemList
            key={itemIndex}
            bidderCount={0}
            endDate={new Date()}
            imageUrl=""
            itemDescription={'설명 테스트 123123asdasdfasdfasdf123'}
            itemId={123}
            itemName={itemIndex.toString()}
            viewCount={10}
          />
        ))}
      </ItemListContainer>
    </HomePageContainer>
  );
};

export default HomePage;

const fetchItem = async (
  pageParam: number = 1,
  query: string | undefined,
  order: string
): Promise<PaginatedResponse<Item>> => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_API_URL +
      '/members?page=' +
      pageParam +
      '&order=' +
      order +
      (query ? '&query=' + query : ''),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const HomePageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: white;
`;

const ItemListContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  width: 100%;
  margin-top: 1rem;
`;
