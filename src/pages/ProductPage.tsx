import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import fetchProduct from '@/queries/fetchProduct';
import arrowCircleUp from '@/assets/icon/arrow-circle-up.svg';
import arrowCircleDown from '@/assets/icon/arrow-circle-down.svg';
// 장바구니 기능 구현 후 버튼 변경 필요
import ProductDetailButton from '@/components/button/AddImageButton';
import DetailImageContainer from '@/components/container/DetailImageContainer';
import RecommendListContainer from '@/components/container/RecommendListContainer';
import { fetchProducts } from '@/queries/fetchProducts';

export default function ProductDetail() {
  const params = useParams();
  const { productId } = params;
  const [quantity, setQuantity] = useState<number>(1);

  const { data: product } = useQuery(['product', productId], fetchProduct);

  const recommend = useQuery(
    ['product', 'productCategory', product?.productCategory, 6],
    fetchProducts
  );

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <main className="w-full flex flex-col justify-center items-center gap-20">
        <section className="flex w-full justify-center gap-20">
          <section className="h-full">
            <DetailImageContainer product={product} />
          </section>

          <section className="flex flex-col justify-between">
            <section className="flex flex-col text-left gap-5">
              <div className="text-4xl">{product.productName}</div>
              <div className="text-base">{product.productDescription}</div>
              <div>가격 : ₩ {product.productPrice}</div>
              <div>남은 수량 : {product.productQuantity}</div>

              <section className="flex gap-10">
                <div>주문 수량 : {quantity}</div>
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      product.productQuantity > quantity &&
                      setQuantity(quantity + 1)
                    }
                  >
                    <div>
                      <img src={arrowCircleUp} alt="arrow-circle-up" />
                    </div>
                  </button>
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    <div>
                      <img src={arrowCircleDown} alt="arrow-circle-down" />
                    </div>
                  </button>
                </div>
              </section>
            </section>
            <ProductDetailButton />
          </section>
        </section>
        <section>
          <div className="text-left text-xl ml-3">Recommend</div>
          <RecommendListContainer products={recommend} />
        </section>
      </main>
    </div>
  );
}
