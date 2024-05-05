import AddImageButton from '@/components/button/AddImageButton';
import ProductForm from '@/components/form/ProductForm';

import useAddProduct from '@/hooks/useAddProduct';
import useChangeInput from '@/hooks/useChangeInput';
import useUploadImage from '@/hooks/useUploadImage';

import { ProductWithId } from '@/types/Product';
import { UserType } from '@/types/User';
import { ERROR_MESSAGES } from '@/utils/validations';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import useDeleteImage from '@/hooks/useDeleteImage';

// import { useNavigate, useParams } from 'react-router';
import close from '@/assets/icon/close.svg';
import Alert from '@/components/modal/Alert';
import { useUserStore } from '@/store/useUserStore';

const AddProductPage = () => {
  const user = useUserStore((state) => state.user);

  const [openAlert, setOpenAlert] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const [errorProduct, setErrorProduct] = useState<string | null>('');

  const [product, setProduct] = useState<ProductWithId>({
    docId: '',
    id: '',
    sellerId: '',
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    category: '',
    image: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // 상품 상태 변경
  const onChangeInput = useChangeInput(user as UserType, product, setProduct);

  // 이미지 등록
  const { addImageHandler } = useUploadImage(
    user as UserType,
    product,
    setProduct,
    setErrorProduct
  );

  // 이미지 삭제
  const { deleteImageHandler } = useDeleteImage(setProduct, setImagesToDelete);

  // 상품 등록
  const { addProductHandler, pathUrl, bodyText } = useAddProduct(
    user as UserType,
    product,
    setErrorProduct,
    setOpenAlert
  );

  return (
    <>
      {/* body  */}
      <div className="w-full flex flex-col justify-center items-center">
        {/* 사진 첨부 */}
        <main className="w-4/5 h-52 grid grid-cols-4 items-center gap-3 px-5 relative border mb-10">
          {product.image.map((img) => (
            <section key={img} className="w-full h-4/5 max-h-52 relative ">
              <div className="w-full h-full overflow-hidden">
                <img
                  src={img}
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => deleteImageHandler(img)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full"
              >
                <img src={close} alt="close" width={20} height={20} />
              </button>
            </section>
          ))}
          <AddImageButton />
          {errorProduct == 'errorProductImage' ? (
            <div className="text-left mt-1 ml-2 text-xs text-red-500">
              {ERROR_MESSAGES[errorProduct]}
            </div>
          ) : null}
        </main>

        {/* 입력 */}
        <ProductForm
          onChangeInput={onChangeInput}
          addImageHandler={addImageHandler}
          product={product}
          setProduct={setProduct}
          addProductHandler={addProductHandler}
          errorCode={errorProduct}
        />

        {openAlert && (
          <Alert>
            <Alert.Content>
              <Alert.Header header="Add Product" />
              <Alert.Body bodyText={bodyText} />
              <Alert.Footer pathUrl={pathUrl} />
            </Alert.Content>
          </Alert>
        )}
      </div>
    </>
  );
};

export default AddProductPage;
