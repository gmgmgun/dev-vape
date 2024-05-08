export interface IFormData {
  email: string;
  password: string;
  passwordConfirm?: string;
  name?: string;
  nickname?: string;
  phone?: string;
  address?: string;
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
    id: 'name',
    type: 'text',
    placeholder: '이름',
  },
  {
    id: 'nickname',
    type: 'text',
    placeholder: '닉네임',
  },
  {
    id: 'phone',
    type: 'text',
    placeholder: '전화번호',
  },
  {
    id: 'address',
    type: 'text',
    placeholder: '닉네임',
  },
];
