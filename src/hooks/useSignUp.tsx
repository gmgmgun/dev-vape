import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { IFormData } from '@/components/form/formConfig';

export default function useSignUp() {
  const navigate = useNavigate();

  const signUp = async (userData: IFormData) => {
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
            email: userData.email,
            nickname: userData.nickname,
            isSeller: false,
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
