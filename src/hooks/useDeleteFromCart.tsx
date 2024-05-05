import { useUserStore } from '@/store/useUserStore';
import { db } from '@/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useMutation, useQueryClient } from 'react-query';

export default function useDeleteFromCart() {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const deleteCartHandler = async (productId: string) => {
    try {
      const q = query(
        collection(db, 'cart'),
        where('productId', '==', productId),
        where('userId', '==', user?.id)
      );

      const qSnapshot = await getDocs(q);

      qSnapshot.forEach(async (docs) => {
        const docId = docs.id;
        const docRef = doc(db, 'cart', docId);
        await deleteDoc(docRef);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartMutation = useMutation(deleteCartHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', user?.id]);
    },
  });
  return deleteCartMutation;
}
