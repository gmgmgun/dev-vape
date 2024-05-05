import { UserType } from '@/types/User';
import { ProductWithId } from '@/types/Product';
import React from 'react';

export default function useChangeInput(
  user: UserType,
  product: ProductWithId,
  setProduct: (value: ProductWithId) => void
) {
  const onChangeInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    // 상품 상태 변경
    if (user) {
      setProduct({ ...product, sellerId: user?.id, [name]: value });
    }
  };

  return onChangeInput;
}
