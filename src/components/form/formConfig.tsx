export interface FormData {
  email: string;
  password: string;
  passwordConfirm?: string;
  nickname?: string;
}

export interface InputProps {
  id: keyof FormData;
  type: string;
  placeholder: string;
  validation: Record<string, string>;
}

export const inputs: InputProps[] = [
  {
    id: 'email',
    type: 'email',
    placeholder: '이메일',
    validation: { required: '이메일은 필수 항목입니다.' },
  },
  {
    id: 'password',
    type: 'password',
    placeholder: '비밀번호',
    validation: { required: '비밀번호는 필수 항목입니다.' },
  },
  {
    id: 'passwordConfirm',
    type: 'password',
    placeholder: '비밀번호 확인',
    validation: { required: '비밀번호 확인은 필수 항목입니다.' },
  },
  {
    id: 'nickname',
    type: 'text',
    placeholder: '닉네임',
    validation: { required: '닉네임은 필수 항목입니다.' },
  },
];
