import ProductCardForHome from '@/components/card/ProductCardForHome';
import { fetchInfiniteProduct } from '@/queries/fetchInfiniteProduct';
import { ProductWithId } from '@/types/Product';
import { OrderByDirection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { categories } from '@/types/Category';

export default function ProductListContainer() {
  const params = useParams();
  const categoryUrl = params.categoryId;
  const categoryName = categories.find(
    (category) => category.url === categoryUrl
  )?.korean;
  const { ref, inView } = useInView();

  // 구현해야 할 부분
  const [option, setOption] = useState<string>('');
  const [direction, setDirection] = useState<OrderByDirection>('desc');

  // react-query -> 모듈화 필요
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    ['product', categoryName, option, direction],
    ({ pageParam, queryKey }) => fetchInfiniteProduct({ pageParam, queryKey }),
    {
      getNextPageParam: (lastPage) => lastPage?.lastVisible,
    }
  );

  // observer
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <>
      {/* <SortButton sortOption={sortOption} /> */}

      <main className="w-full grid grid-cols-3 gap-5 place-items-center">
        {data?.pages
          .flatMap((page) => page?.data)
          .filter(
            (productWithId): productWithId is ProductWithId =>
              productWithId !== undefined
          )
          .map((product) => (
            <ProductCardForHome key={product.id} product={product} />
          ))}
      </main>
      <div ref={ref}></div>
    </>
  );
}
