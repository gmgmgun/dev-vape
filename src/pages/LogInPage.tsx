import { Link } from 'react-router-dom';
import useLogIn from '@/hooks/useLogIn';
import LogInForm from '@/components/form/LogInForm';

export default function LogInPage() {
  const logIn = useLogIn(); // 로그인 로직 훅

  return (
    <>
      <main className="relative w-1/2 mt-20 m-auto bg-[url('./assets/image/login.webp')] bg-cover bg-center bg-no-repeat">
        <div className="inset-0 w-full h-full z-20 bg-black bg-opacity-50"></div>
        <section className="w-full h-full m-auto flex justify-center z-30">
          <div className="w-full h-fit p-20 flex flex-col bg-black bg-opacity-80">
            <div className="mb-10">
              <h1 className="text-5xl mb-4">Login</h1>
            </div>
            <LogInForm logIn={logIn} />
            <div className="h-px mb-8 line-main"></div>
            <section className="">
              <p className="text-sm mb-1">계정이 없으신가요?</p>
              <Link className="text-sm under-line" to={'/signup'}>
                회원가입하러 가기
              </Link>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
