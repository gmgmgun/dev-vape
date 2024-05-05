import { db } from '@/firebase';
import { ProductWithId } from '@/types/Product';
import { UserType } from '@/types/User';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';

export default function useFetchCart(
  user: UserType | null,
  product: ProductWithId,
  setIsAdded: (value: boolean) => void
) {
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const q = query(
            collection(db, 'cart'),
            where('productId', '==', product.id),
            where('userId', '==', user.id)
          );

          const qSnapshot = await getDocs(q);

          if (qSnapshot.docs.length > 0) {
            setIsAdded(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [user, product]);
}
