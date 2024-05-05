import { ProductWithId } from '@/types/Product';
import { Link } from 'react-router-dom';

export default function ProductCardForHome({
  product,
}: {
  product: ProductWithId;
}) {
  return (
    <Link to={`/product/${product.docId}`} className="w-full h-full">
      <div className="w-full h-full p-2 hover:scale-105 transition duration-300">
        <div className="rounded-3xl overflow-hidden bg-white">
          <img
            src={product.image[0]}
            alt="product"
            className="w-full h-full object-cover aspect-square"
          />
        </div>

        <section className="w-full p-3">
          <div className="text-left text-sm font-bold review">
            {product.name}
          </div>

          <div className="flex justify-between text-left text-xs text-gray-400 ">
            <p>₩ {product.price}</p>
          </div>
        </section>
      </div>
    </Link>
  );
}
