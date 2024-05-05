import { useUserStore } from '@/store/useUserStore';
import { db } from '@/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useMutation, useQueryClient } from 'react-query';

export default function useUpdateCart() {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const updateQuantityHandler = async ({
    productId,
    newQuantity,
  }: {
    productId: string;
    newQuantity: number;
  }) => {
    try {
      const q = query(
        collection(db, 'cart'),
        where('productId', '==', productId),
        where('userId', '==', user?.id)
      );

      const qSnapshot = await getDocs(q);

      if (!qSnapshot.empty) {
        qSnapshot.forEach(async (docs) => {
          const docRef = doc(db, 'cart', docs.id);
          await updateDoc(docRef, {
            productQuantity: newQuantity,
          });
        });
      } else {
        console.log('No doc');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartMutation = useMutation(updateQuantityHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', user?.id]);
    },
  });
  return updateCartMutation;
}
