import { getAuth, signOut } from 'firebase/auth';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/types/Category';
import { CategoryContainer } from '@/components/container/CategoryContainer';

const HomePage = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => console.log('Logged out successfully!'))
      .catch((error) => console.log(error));
  };

  const handleAddProduct = () => {
    const sellerId = user?.id;
    if (user && typeof sellerId === 'string') {
      navigate(`/seller/${sellerId}/add-product`);
    } else {
      console.error('Invalid sellerId:', sellerId);
    }
  };

  const handleSeller = () => {
    const sellerId = user?.id;
    if (user && typeof sellerId === 'string') {
      navigate(`/seller/${sellerId}`);
    } else {
      console.error('Invalid sellerId:', sellerId);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout 버튼</button>
      <button onClick={handleAddProduct}>AddProduct 가기</button>
      <button onClick={handleSeller}>Seller 가기</button>
      <main className="flex flex-col gap-10">
        {categories.map((category) => (
          <CategoryContainer key={category.id} category={category} />
        ))}
      </main>
    </div>
  );
};

export default HomePage;
