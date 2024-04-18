import { useState } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { UserType } from '@/models/type';
import useSignup from '@/hooks/useSignUp';
import SignUpForm from '@/components/form/SignUpForm';

export default function SignUpPage() {
  const [user, setUser] = useState<UserType>({
    id: '',
    email: '',
    isSeller: false,
    nickname: '',
    password: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const signUp = useSignup({ user });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <main className="relative w-1/2 mt-20 m-auto bg-cover bg-center bg-no-repeat">
        <div className="inset-0 w-full h-full z-20 bg-black bg-opacity-50"></div>
        <div className="w-full h-full m-auto flex justify-center z-30">
          <div className="w-full h-fit p-20 flex flex-col bg-black bg-opacity-80">
            <section className="mb-20">
              <h1 className="text-5xl mb-4">Sign Up</h1>
            </section>
            <SignUpForm
              user={user}
              handleChange={handleChange}
              setUser={setUser}
              signUp={signUp}
            />
          </div>
        </div>
      </main>
    </>
  );
}
