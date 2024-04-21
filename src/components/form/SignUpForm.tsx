import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signUpFormSchema } from '@/utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { IFormData, inputs } from './formConfig';

interface SignUpFormProps {
  signUp: (data: IFormData) => Promise<void>;
}

export default function SignUpForm({ signUp }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(signUpFormSchema),
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
              {...register(input.id)}
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
