import useSignUp from '@/hooks/useSignUp';
import SignUpForm from '@/components/form/SignUpForm';

const SignUpPage = () => {
  const signUp = useSignUp();
  return (
    <>
      <main className="relative w-1/2 mt-20 m-auto bg-cover bg-center bg-no-repeat">
        <div className="inset-0 w-full h-full z-20 bg-black bg-opacity-50"></div>
        <div className="w-full h-full m-auto flex justify-center z-30">
          <div className="w-full h-fit p-20 flex flex-col bg-black bg-opacity-80">
            <section className="mb-20">
              {/* 공통 레이아웃으로 뺄 수 있음 */}
              <h1 className="text-5xl mb-4">Sign Up</h1>
            </section>
            <SignUpForm signUp={signUp} />
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUpPage;
