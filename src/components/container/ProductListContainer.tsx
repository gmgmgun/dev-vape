import ProductCardForHome from '@/components/card/ProductCardForHome';
import { fetchInfiniteProduct } from '@/queries/fetchInfiniteProduct';
import { ProductWithId } from '@/types/Product';
import { OrderByDirection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
// import SortButton from '@/components/button/SortButton';
import { useUserStore } from '@/store/useUserStore';
import { categories } from '@/types/Category';

export default function ProductListContainer() {
  const params = useParams();
  const categoryUrl = params.categoryId;
  const categoryName = categories.find(
    (category) => category.url === categoryUrl
  )?.korean;
  const user = useUserStore((state) => state.user);
  // console.log('params:', params);
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  console.log(categoryName);
  const [option, setOption] = useState<string>('');
  const [direction, setDirection] = useState<OrderByDirection>('desc');

  // react-query
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

  // const sortOption = (option: string, direction: OrderByDirection) => {
  //   setOption(option);
  //   setDirection(direction);

  //   // 쿼리데이터 무효 -> 다시 가져오기
  //   queryClient.invalidateQueries([
  //     'product',
  //     user?.id,
  //     params.category,
  //     params.category,
  //     option,
  //     direction,
  //   ]);
  // };

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
