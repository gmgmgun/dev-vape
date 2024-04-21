import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IFormData, inputs } from './formConfig';

interface LogInFormProps {
  logIn: (data: IFormData) => Promise<void>;
}

export default function LogInForm({ logIn }: LogInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  return (
    <form
      onSubmit={handleSubmit((data) => logIn(data))}
      className="flex flex-col gap-5 mb-8"
    >
      {inputs
        .filter((input) => input.id === 'email' || input.id === 'password')
        .map((input) => (
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
      <Button type="submit">로그인</Button>
    </form>
  );
}
