import useDeleteFromCart from '@/hooks/useDeleteFromCart';
import useUpdateCart from '@/hooks/useUpdateCart';
import { ICartItem } from '@/types/Cart';
import fetchProduct from '@/queries/fetchProduct';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import close from '@/assets/icon/close.svg';

export default function CartItemCard({
  item,
  selectHandler,
  handleQuantityChange,
  isSelected,
}: {
  item: ICartItem;
  selectHandler: (item: ICartItem) => void;
  handleQuantityChange: (productId: string, quantity: number) => void;
  isSelected: boolean;
}) {
  const location = useLocation();

  // 상품 조회
  const { data: product, isLoading } = useQuery(
    ['product', item.productId],
    fetchProduct,
    {
      onSuccess: (data) => {
        if (!data) {
          deleteCartMutation.mutate(item.productId);
        }
      },
    }
  );

  // 장바구니 삭제
  const deleteCartMutation = useDeleteFromCart();
  // 장바구니 수정
  const updateCartMutation = useUpdateCart();

  // 장바구니 수량 수정
  const [quantity, setQuantity] = useState<number>(item.quantity);

  useEffect(() => {
    updateCartMutation.mutate({
      productId: item.productId,
      newQuantity: quantity,
    });
  }, [quantity]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={`CartItemCard relative h-44 w-full min-w-60 flex rounded-2xl transform transition-all duration-200  border ${
        isSelected ? 'scale-105 border-blue-800 border-2' : 'border-gray-200'
      }`}
      onClick={() => selectHandler(item)}
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
            {location.pathname.includes('payment') ? null : (
              <div className="flex items-center">
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l hover:bg-gray-300 focus:outline-none"
                  name="increaseQuantity"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product && product.quantity > quantity) {
                      setQuantity(quantity + 1);
                      handleQuantityChange(item.productId, quantity + 1);
                    }
                  }}
                >
                  +
                </button>
                <span className="w-12 px-2 py-1 text-center border border-gray-300 focus:outline-none">
                  {quantity}
                </span>
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300 focus:outline-none"
                  name="decreaseQuantity"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                      handleQuantityChange(item.productId, quantity - 1);
                    }
                  }}
                >
                  -
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {location.pathname.includes('payment') ? null : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteCartMutation.mutate(item.productId);
          }}
          className="absolute -top-2 -right-3 rounded-full bg-red-500"
        >
          <div>
            <img src={close} alt="close" width="24" height="24" />
          </div>
        </button>
      )}
    </div>
  );
}
