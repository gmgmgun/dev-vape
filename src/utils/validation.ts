import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

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
