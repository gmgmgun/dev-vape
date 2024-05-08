import { db } from '@/firebase';
import { Product, ProductWithId } from '@/types/Product';
import {
  DocumentSnapshot,
  OrderByDirection,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { QueryFunctionContext } from '@tanstack/react-query';

export const fetchInfiniteProduct = async ({
  pageParam = null,
  queryKey,
}: {
  pageParam: QueryFunctionContext<[], DocumentSnapshot> | null;
  queryKey: unknown[];
}) => {
  // queryKey 변수 선언
  const [_key, category, option, direction = 'desc'] = queryKey as [
    string,
    string,
    string,
    OrderByDirection
  ];

  // 실행
  try {
    let q = query(collection(db, _key), limit(4));
    // 카테고리
    if (category) {
      q = query(q, where('category', '==', category));
    }

    // 정렬 조건
    switch (option) {
      case 'price':
        q = query(q, orderBy('price', direction));
        break;
      case 'updatedAt':
        q = query(q, orderBy('updatedAt', direction));
        break;
      default:
        q = query(q, orderBy('updatedAt', direction));
        break;
    }

    // 페이지 시작 지점
    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    const qSnapshot = await getDocs(q);
    const lastVisible = qSnapshot.docs[qSnapshot.docs.length - 1];

    const data = qSnapshot.docs.map((doc) => {
      const product = doc.data() as Product;
      return { docId: doc.id, ...product } as ProductWithId;
    });
    return { data, lastVisible };
  } catch (error) {
    console.log(error);
  }
};
