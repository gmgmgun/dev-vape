import { getAuth, signOut } from 'firebase/auth';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/types/Category';
import { CategoryContainer } from '@/components/container/CategoryContainer';

const HomePage = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => setUser(null))
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

  const handleCart = () => {
    const customerId = user?.id;
    if (user && typeof customerId === 'string') {
      navigate(`/cart/${customerId}`);
    } else {
      console.error('Invalid sellerId:', customerId);
    }
  };

  const handlePayment = () => {
    const customerId = user?.id;
    if (user && typeof customerId === 'string') {
      navigate(`/payment/${customerId}`);
    } else {
      console.error('Invalid sellerId:', customerId);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login </button>
      <button onClick={handleLogout}>Logout </button>
      <button onClick={handleAddProduct}>AddProduct </button>
      <button onClick={handleSeller}>Seller </button>
      <button onClick={handleCart}>Cart </button>
      <button onClick={handlePayment}>Payment </button>
      <main className="flex flex-col gap-10">
        {categories.map((category) => (
          <CategoryContainer key={category.id} category={category} />
        ))}
      </main>
    </div>
  );
};

export default HomePage;
