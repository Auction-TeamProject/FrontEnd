import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import styled from 'styled-components';

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

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
const HomePage = () => {
  const [order] = useState<Order>(Order.ASC);
  const [SearchInputValue, setSearchInputValue] = useState<string>();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['items', SearchInputValue, order],
    queryFn: ({ pageParam = 1 }) =>
      fetchItem(pageParam, SearchInputValue, order),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return (
    <HomePageContainer>
      <SearchBar setSearchInputValue={setSearchInputValue}></SearchBar>
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
