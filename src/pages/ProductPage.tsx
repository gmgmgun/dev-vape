import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import fetchProduct from '@/queries/fetchProduct';
import arrowCircleUp from '@/assets/icon/arrow-circle-up.svg';
import arrowCircleDown from '@/assets/icon/arrow-circle-down.svg';
import ProductDetailButton from '@/components/button/AddImageButton';
import DetailImageContainer from '@/components/container/DetailImageContainer';

export default function ProductDetail() {
  const params = useParams();
  const { productId } = params;
  const [quantity, setQuantity] = useState<number>(1);

  const { data: product } = useQuery(['product', productId], fetchProduct);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full flex justify-center items-center mt-10">
      {/* body  */}
      <main className="w-full flex flex-col justify-center items-center gap-20">
        <section className="flex w-full justify-center gap-20">
          <section className="h-full">
            <DetailImageContainer product={product} />
          </section>

          <section className="flex flex-col justify-between">
            {/* 상품 정보 */}
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
                      <img src={arrowCircleUp} alt="ArrowCircleUp" />
                    </div>
                  </button>
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    <div>
                      <img src={arrowCircleDown} alt="ArrowCircleDown" />
                    </div>
                  </button>
                </div>
              </section>
            </section>

            {/* 버튼 */}
            <ProductDetailButton />
          </section>
        </section>
      </main>
    </div>
  );
}
