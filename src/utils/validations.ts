import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { z } from 'zod';

export type ErrorCode = {
  [key: string]: string;
};

// 에러 메세지
export const ERROR_MESSAGES: ErrorCode = {
  INVALID_ACCOUNT: '이메일과 비밀번호를 확인해주세요.',
};

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
