import { Product } from '@/types/Product';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { z } from 'zod';

export type ErrorCode = {
  [key: string]: string;
};

// 에러 메세지
export const ERROR_MESSAGES: ErrorCode = {
  errorPassowordLength: '비밀번호는 10자리 이상이어야 합니다.',
  errorPasswordComplexity:
    '비밀번호는 대문자, 소문자, 숫자, 특수문자 중 최소 2종류 이상 포함해야 합니다.',
  errorPasswordInclude: '비밀번호는 아이디를 포함할 수 없습니다. ',
  errorEmailConstruct: '이메일 형식이 맞지 않습니다.',
  errorProductName: '상품의 이름은 입력해주세요.',
  errorProdcutPrice: '상품의 가격을 입력해주세요.',
  errorProdcutQuantity: '상품의 수량을 입력해주세요.',
  errorProductDescription: '상품의 설명을 입력해주세요.',
  errorProductCategory: '상품의 카테고리를 입력해주세요',
  errorProductImage: '상품의 이미지를 첨부해주세요.',
  errorLogin: '이메일과 비밀번호를 확인해주세요.',
};

// 상품 등록 유효성 검사
export function validateProduct(product: Product | null): string | null {
  // product가 null인 경우 즉시 함수를 종료
  if (!product) return '';

  if (product.productImage.length < 1) return 'errorProductImage';
  if (product.productName === '') return 'errorProductName';
  if (product.productPrice === 0) return 'errorProdcutPrice';
  if (product.productQuantity === 0) return 'errorProdcutQuantity';
  if (product.productDescription === '') return 'errorProductDescription';
  if (product.productCategory === '') return 'errorProductCategory';

  return null;
}

// 로그인 유효성 검사
export function validateLogIn(
  docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]
) {
  if (docs.length === 0) return ERROR_MESSAGES.INVALID_ACCOUNT;

  return null;
}

export const logInFormSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

export const signUpFormSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/[A-Z]/, '비밀번호에는 적어도 하나의 대문자가 포함되어야 합니다.')
    .regex(/[a-z]/, '비밀번호에는 적어도 하나의 소문자가 포함되어야 합니다.')
    .regex(/[0-9]/, '비밀번호에는 적어도 하나의 숫자가 포함되어야 합니다.'),
  passwordConfirm: z.string().nonempty('비밀번호 확인은 필수 항목입니다.'),
  nickname: z.string().min(3, '닉네임은 최소 3자 이상이어야 합니다.'),
});