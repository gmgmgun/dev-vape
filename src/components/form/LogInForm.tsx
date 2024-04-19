import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FormData {
  email: string;
  password: string;
}

interface LogInFormProps {
  logIn: (data: FormData) => Promise<void>;
}

export default function LogInForm({ logIn }: LogInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form
      onSubmit={handleSubmit((data) => logIn(data))}
      className="flex flex-col gap-5 mb-8"
    >
      <Input
        id="email"
        type="email"
        placeholder="Email"
        {...register('email', { required: '이메일은 필수 항목입니다.' })}
      />
      {errors.email && <span className="error">{errors.email.message}</span>}
      <Input
        id="password"
        type="password"
        placeholder="Password"
        {...register('password', { required: '비밀번호는 필수 항목입니다.' })}
      />
      {errors.password && (
        <span className="error">{errors.password.message}</span>
      )}
      <Button type="submit">로그인</Button>
    </form>
  );
}
