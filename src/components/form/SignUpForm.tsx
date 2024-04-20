import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserType } from '@/types/User';

interface SignUpFormProps {
  signUp: (user: UserType) => Promise<void>;
}

export default function SignUpForm({ signUp }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>();

  const onSubmit = handleSubmit((data) => {
    signUp(data);
  });

  return (
    <section>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 mb-12">
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
        <Input
          id="nickname"
          type="nickname"
          placeholder="Nickname"
          {...register('nickname', { required: '닉네임은 필수 항목입니다.' })}
        />
        {errors.nickname && (
          <span className="error">{errors.nickname?.message}</span>
        )}
        <Button id="signUpButton" type="submit">
          가입
        </Button>
      </form>
    </section>
  );
}
