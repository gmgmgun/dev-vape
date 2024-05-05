import CartItemCard from '@/components/card/CartItemCard';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/useUserStore';
import useSelectCart from '@/hooks/useSelectFromCart';
import fetchCart from '@/queries/fetchCart';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';

export default function CartPage() {
  const user = useUserStore((state) => state.user);
  // 장바구니 전체 조회
  const { data: cartItems } = useQuery(['cart', user?.id], fetchCart);

  // 상품 선택
  const { selectedItems, selectHandler, handleQuantityChange, isSelected } =
    useSelectCart();

  // 장바구니 가격 조회
  const totalPrice = useMemo(() => {
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [selectedItems]);

  // 결제 정보 입력 모달 활성화
  const [openModal, setOpenModal] = useState<boolean>(false);
  const openModalHandler = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      {/* body  */}
      <main>
        <div className="w-full h-px bg-slate-300 mb-8"></div>

        <div className="mb-8">구매를 원하시는 상품을 클릭 해주세요</div>

        {/* 수량 및 가격 */}
        <section className="flex justify-center gap-10 mb-8">
          <div className="text-xl">
            Select Product : {selectedItems?.length}
          </div>
          <div className="text-xl">Total Price : KRW {totalPrice}</div>
        </section>

        {/* 상품 */}
        <section className="grid grid-cols-2 gap-10 py-10 px-10 mb-30 place-items-center">
          {cartItems?.map((item) => (
            <CartItemCard
              key={item.productId}
              item={item}
              selectHandler={() => selectHandler(item)}
              handleQuantityChange={handleQuantityChange}
              isSelected={isSelected(item)}
            />
          ))}
        </section>

        {/* 결제 */}
        <Button
          className="w-1/2 text-lg"
          onClick={openModalHandler}
          disabled={selectedItems.length < 1}
        >
          Buy
        </Button>
      </main>
    </>
  );
}
