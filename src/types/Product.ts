import { FieldValue, Timestamp } from 'firebase/firestore';

// 상품 타입 정의
export interface Product {
  id?: string;
  sellerId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory: string;
  productImage: string[];
  createdAt: FieldValue | Timestamp;
  updatedAt: FieldValue | Timestamp;
}
export interface ProductWithId extends Product {
  docId: string;
}
