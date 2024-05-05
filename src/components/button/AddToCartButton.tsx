import { ProductWithId } from '@/types/Product';
import { UserType } from '@/types/User';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import useAddToCart from '@/hooks/useAddToCart';

interface AddToCartButtonProp {
  user: UserType | null | undefined;
  product: ProductWithId;
  quantity: number;
}

export default function AddToCartButton({
  user,
  product,
  quantity,
}: AddToCartButtonProp) {
  // 장바구니 추가
  const { addCartMutation } = useAddToCart(product, quantity);

  // 판매자 확인
  const CheckSeller = () => {
    // 판매자와 구매자가 다를 시
    if (product.sellerId !== user?.id) {
      if (product.quantity == 0) {
        return <div className="text-3xl text-red-400">Sold out</div>;
      } else {
        return <Button disabled>Add to Cart</Button>;
      }
    }

    // 판매자와 구매자가 같을 시
    return (
      <Link
        to={`/seller/${user?.id}/manage-product/${product.id}`}
        className="w-full"
      >
        <Button>See the Product</Button>
      </Link>
    );
  };

  // 로그인한 경우
  const CheckUser = () => {
    // 잔여 수량이 0일 경우
    if (product.quantity == 0) {
      return <div className="text-3xl text-red-400">Sold out</div>;
    }

    // 구매 가능한 경우
    return <Button onClick={addCartMutation.mutate}>Add to Cart</Button>;
  };

  // 로그인하지 않은 경우
  const CheckNoUser = () => {
    if (product.quantity == 0) {
      return <div className="text-3xl text-red-400">Sold out</div>;
    } else {
      <Link to="/signup" className="w-full">
        <Button>Add to Cart</Button>
      </Link>;
    }
  };

  return (
    <section className="w-full">
      {user?.isSeller ? (
        <CheckSeller />
      ) : user ? (
        <CheckUser />
      ) : (
        <CheckNoUser />
      )}
    </section>
  );
}
