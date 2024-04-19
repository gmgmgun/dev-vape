import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const navigate = useNavigate();

  const login = async (data: { email: string; password: string }) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return login;
}
