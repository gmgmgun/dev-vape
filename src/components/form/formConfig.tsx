export interface IFormData {
  email: string;
  password: string;
  passwordConfirm?: string;
  nickname?: string;
}

export interface InputProps {
  id: keyof IFormData;
  type: string;
  placeholder: string;
}

export const inputs: InputProps[] = [
  {
    id: 'email',
    type: 'email',
    placeholder: '이메일',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: '비밀번호',
  },
  {
    id: 'passwordConfirm',
    type: 'password',
    placeholder: '비밀번호 확인',
  },
  {
    id: 'nickname',
    type: 'text',
    placeholder: '닉네임',
  },
];
