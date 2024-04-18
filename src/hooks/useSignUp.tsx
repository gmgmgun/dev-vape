import { auth, db } from '@/firebase';
import { UserType } from '@/models/type';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface useSignUpPropType {
  user: UserType;
}

export default function useSignUp({ user }: useSignUpPropType) {
  const navigte = useNavigate();

  const signUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 이메일 형식 유효성 검사 필요

    // 비밀번호 유효성 검사 필요

    try {
      console.log(user.email, user.password);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      if (firebaseUser) {
        const userRef = doc(db, 'user', firebaseUser.uid);

        await setDoc(
          userRef,
          {
            ...user,
            id: firebaseUser.uid,
          },
          { merge: true }
        );
      }

      navigte('/login');
    } catch (error) {
      console.log(error);
      // 중복된 이메일 필터링 필요
    }
  };

  return signUp;
}
