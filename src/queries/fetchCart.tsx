import { db } from '@/firebase';
import { ICartItem } from '@/types/Cart';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function fetchCart({ queryKey }: { queryKey: unknown[] }) {
  const [_key, user] = queryKey as [string, string];
  try {
    if (user) {
      const q = query(collection(db, _key), where('userId', '==', user));

      const qSnapshot = await getDocs(q);

      const cartItems = qSnapshot.docs.map((doc) => {
        const cartItem = doc.data() as ICartItem;
        return { ...cartItem } as ICartItem;
      });

      return cartItems;
    }
  } catch (error) {
    console.log(error);
  }
}
