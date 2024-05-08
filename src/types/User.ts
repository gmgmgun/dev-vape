import { FieldValue, Timestamp } from 'firebase/firestore';

// 사용자 타입 정의
export interface UserType {
  id: string;
  email: string;
  isSeller: boolean;
  name: string;
  phone: string;
  address: string;
  nickname: string;
  password?: string;
  createdAt: FieldValue | Timestamp;
  updatedAt: FieldValue | Timestamp;
}
