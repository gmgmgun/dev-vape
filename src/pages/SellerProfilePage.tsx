import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { useInfiniteQuery } from 'react-query';
import { fetchInfiniteProduct } from '@/queries/fetchInfiniteProduct';
import { useInView } from 'react-intersection-observer';
import { ProductWithId } from '@/types/Product';
import ProductCardForProfile from '@/components/card/ProductCardForProfile';
import { OrderByDirection } from 'firebase/firestore';
import LinkContainer from '@/components/container/LinkContainer';

const SellerProfilePage = () => {
  const params = useParams();
  const paramsId = params.id;
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const category: string = '';
  const option: string = '';
  const direction: OrderByDirection = 'desc';
  const user = useUserStore((state) => state.user);

  // react-query
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    ['product', user?.id, paramsId, category, option, direction],
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
      <div className="w-full h-px bg-slate-300 mb-8"></div>

      {/* 링크 */}
      <section className="flex justify-start items-start gap-24 mt-20 ml-10 mb-20">
        {/* 프로필 편집 */}
        <LinkContainer
          path={`/editprofile/${user?.id}`}
          title={'Edit Profile'}
          discription={'Edit your Profile'}
        />
        {/* 상품 등록 */}
        <LinkContainer
          path={`/seller/${user?.id}/add-product`}
          title={'Add Product'}
          discription={'Add your Product'}
        />

        {/* 주문 관리 */}
        <LinkContainer
          path={`/seller/order/${user?.id}`}
          title={'My Order'}
          discription={'Manage your Order'}
        />
      </section>

      {/* 상품 리스트 */}
      <div className="text-left text-3xl px-10">Product List</div>

      <section className="grid grid-cols-2 gap-5 py-8 px-10 mb-30">
        {data?.pages
          .flatMap((page) => page?.data)
          .filter(
            (productWithId): productWithId is ProductWithId =>
              productWithId !== undefined
          )
          .map((product) => (
            <ProductCardForProfile key={product.id} product={product} />
          ))}
      </section>
      <div ref={ref}></div>
    </>
  );
};

export default SellerProfilePage;
