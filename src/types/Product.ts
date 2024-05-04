import { FieldValue, Timestamp } from 'firebase/firestore';

// 상품 타입 정의
export interface Product {
  id?: string;
  sellerId: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  image: string[];
  createdAt: FieldValue | Timestamp;
  updatedAt: FieldValue | Timestamp;
}

export interface ProductWithId extends Product {
  docId: string;
}
