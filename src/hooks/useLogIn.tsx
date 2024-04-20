import { auth, db } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { UserType } from '@/types/User';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';

export default function useLogin() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const login = async (data: { email: string; password: string }) => {
    const { email, password } = data;

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, 'user', user.user.uid);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data() as UserType);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return login;
}
