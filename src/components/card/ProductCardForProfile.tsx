import { ProductWithId } from '@/types/Product';
import { useUserStore } from '@/store/useUserStore';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: ProductWithId;
}

const ProductCardForProfile = ({ product }: ProductCardProps) => {
  const user = useUserStore((state) => state.user);
  return (
    <Link
      to={`/seller/${user?.id}/edit-product/${product.docId}`}
      className="h-44 w-full min-w-60 flex border rounded-2xl hover:scale-105 transition duration-300"
    >
      <section className="w-1/3 h-full">
        <img
          src={product.image[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </section>

      <section className="w-2/3 h-full flex justify-between  flex-col p-3">
        <div>
          <div className="text-left text-lg font-bold review">
            {product.name}
          </div>
          <div className="text-left text-sm text-gray-400 review">
            {product.description}
          </div>
        </div>

        <div className="flex justify-between text-left text-xs">
          <p>KRW {product.price}</p>
          <p>
            Quantity : <span>{product.quantity}</span>
          </p>
        </div>
      </section>
    </Link>
  );
};

export default ProductCardForProfile;
