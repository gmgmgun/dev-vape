import { ICartItem } from '@/types/Cart';
import fetchProduct from '@/queries/fetchProduct';
import { useQuery } from 'react-query';

export default function PaymentItemCard({ item }: { item: ICartItem }) {
  const { data: product, isLoading } = useQuery(
    ['product', item.productId],
    fetchProduct,
    {}
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={
        'CartItemCard relative h-44 w-full min-w-60 flex rounded-2xl transform transition-all duration-200  border'
      }
    >
      <section className="w-1/1 h-full">
        <img
          src={product?.image[0]}
          alt={product?.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </section>

      <section className="w-2/3 h-full flex justify-between flex-col p-3">
        <div>
          <div className="text-left text-lg font-bold review">
            {product?.name}
          </div>
        </div>
        <div className="flex justify-between items-center text-left text-xs">
          <div>₩ {product ? product?.price * item.quantity : null}</div>
          <div className="flex justify-center items-center gap-2">
            {/* 수량 증감 장바구니 페이지에서만 가능 */}
          </div>
        </div>
      </section>
    </div>
  );
}
