import { db } from '@/firebase';
import { useUserStore } from '@/store/useUserStore';
import { ProductWithId } from '@/types/Product';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

export default function useAddToCart(
  product: ProductWithId | undefined,
  quantity: number
) {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const addCartHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const q = query(
        collection(db, 'cart'),
        where('productId', '==', product?.id),
        where('userId', '==', user?.id)
      );

      const qSnapshot = await getDocs(q);

      if (qSnapshot.docs.length > 0) {
        console.log('장바구니 추가 성공');
      } else {
        const cartRef = doc(collection(db, 'cart'));
        await setDoc(cartRef, {
          userId: user?.id,
          productId: product?.id,
          productQuantity: quantity,
          productPrice: product?.productPrice,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addCartMutation = useMutation(addCartHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', user?.id]);
    },
  });

  return { addCartMutation };
}
