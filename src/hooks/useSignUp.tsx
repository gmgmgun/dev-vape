import { auth, db } from '@/firebase';
import { UserType } from '@/types/User';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function useSignUp() {
  const navigate = useNavigate();

  const signUp = async (userData: UserType) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      await updateProfile(firebaseUser, {
        displayName: userData.nickname,
      });

      if (firebaseUser) {
        const userRef = doc(db, 'user', firebaseUser.uid);

        await setDoc(
          userRef,
          {
            ...userData,
            id: firebaseUser.uid,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          { merge: true }
        );
      }

      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return signUp;
}
