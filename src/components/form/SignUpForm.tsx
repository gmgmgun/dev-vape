import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IFormData, inputs } from './formConfig';

// export interface FormData {
//   email: string;
//   password: string;
//   passwordConfirm?: string;
//   nickname?: string;
// }

// interface InputProps {
//   id: keyof FormData;
//   type: string;
//   placeholder: string;
//   validation: Record<string, string>;
// }

// const inputs: InputProps[] = [
//   {
//     id: 'email',
//     type: 'email',
//     placeholder: '이메일',
//     validation: { required: '이메일은 필수 항목입니다.' },
//   },
//   {
//     id: 'password',
//     type: 'password',
//     placeholder: '비밀번호',
//     validation: { required: '비밀번호는 필수 항목입니다.' },
//   },
//   {
//     id: 'passwordConfirm',
//     type: 'password',
//     placeholder: '비밀번호 확인',
//     validation: { required: '비밀번호 확인은 필수 항목입니다.' },
//   },
//   {
//     id: 'nickname',
//     type: 'text',
//     placeholder: '닉네임',
//     validation: { required: '닉네임은 필수 항목입니다.' },
//   },
// ];

interface SignUpFormProps {
  signUp: (data: IFormData) => Promise<void>;
}

export default function SignUpForm({ signUp }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(formDataSchema),
  });

  const onSubmit = handleSubmit((data) => {
    signUp(data);
  });

  return (
    <section>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 mb-12">
        {inputs.map((input) => (
          <div key={input.id}>
            <Input
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              {...register(input.id, input.validation)}
            />
            {errors[input.id] && (
              <span className="error">{errors[input.id]?.message}</span>
            )}
          </div>
        ))}
        <Button id="signUpButton" type="submit">
          가입
        </Button>
      </form>
    </section>
  );
}

const passwordValidationSchema = z
  .string()
  .min(1, '비밀번호는 필수 항목입니다.')
  .refine(
    (val) =>
      /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{10,}/.test(val) ||
      /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/.test(val),
    {
      message:
        '비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자를 모두 포함해야 합니다.',
    }
  );

const formDataSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  password: passwordValidationSchema,
  passwordConfirm: z.string().min(1, '비밀번호 확인은 필수 항목입니다.'),
  nickname: z.string().min(1, '닉네임은 필수 항목입니다.'),
});
