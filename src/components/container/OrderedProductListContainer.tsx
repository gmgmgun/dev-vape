import { useQuery } from 'react-query';
import { useUserStore } from '@/store/useUserStore';
import fetchCart from '@/queries/fetchCart';
import PaymentItemCard from '../card/PaymentItemCard';

export default function OrderedProductListContainer() {
  const user = useUserStore((state) => state.user);
  const { data: cartItems } = useQuery(['cart', user?.id], fetchCart);
  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <section className="grid grid-cols-2 gap-10 py-10 px-10 mb-30 place-items-center">
      {cartItems?.map((item) => (
        <PaymentItemCard key={item.productId} item={item} />
      ))}
      <div>{totalPrice}</div>
    </section>
  );
}
