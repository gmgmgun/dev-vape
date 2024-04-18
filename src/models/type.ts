import { FieldValue, Timestamp } from 'firebase/firestore';

// 사용자 타입 정의
export interface UserType {
  id: string;
  email: string;
  isSeller: boolean;
  nickname: string;
  password: string;
  createdAt: FieldValue | Timestamp;
  updatedAt: FieldValue | Timestamp;
}

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
  createdAt: FieldValue;
  updatedAt: FieldValue;
}
export interface ProductWithId extends Product {
  docId: string;
}

// 장바구니 타입
export interface CartType {
  userId: string;
  productId: string;
  productQuantity: number;
  productPrice: number;
}

// 주문 내역 타입
export interface OrderType {
  userId: string;
  sellerId: string;
  productId: string;
  productPrice: number;
  productQuantity: number;
  orderState: string;
  orderGroup: string;
}

// 주문 내역 그룹 타입
export interface OrderGroup {
  [key: string | number]: {
    orderGroup: string;
    product: string[];
    totalPrice: number;
  };
}
