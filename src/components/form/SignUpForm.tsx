import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserType } from '@/models/type';

interface SignUpFormType {
  user: UserType;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setUser: (value: UserType) => void;
  signUp: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SignUpForm({
  user,
  handleChange,
  signUp,
}: SignUpFormType) {
  return (
    <section>
      <form className="flex flex-col gap-5 mb-12">
        {fields.map((field) => (
          <div key={field.id}>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={user[field.name as keyof UserType] as string}
              name={field.name}
              onChange={handleChange}
            />
          </div>
        ))}
        <Button id="signUpButton" onClick={signUp}>
          Sign Up
        </Button>
      </form>
    </section>
  );
}

const fields = [
  { id: 'email-signup', type: 'email', placeholder: 'Email', name: 'email' },
  {
    id: 'password-signup',
    type: 'password',
    placeholder: 'Password',
    name: 'password',
  },
  {
    id: 'nickname-signup',
    type: 'text',
    placeholder: 'Nickname',
    name: 'nickname',
  },
];
