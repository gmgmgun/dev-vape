import { useState } from 'react';
import AddImageButton from '@/components/button/AddImageButton';
import ProductForm from '@/components/form/ProductForm';
import { useUserStore } from '@/store/useUserStore';
import useChangeInput from '@/hooks/useChangeInput';
import useDeleteProduct from '@/hooks/useDeleteProduct';
import useUploadImage from '@/hooks/useUploadImage';
import useUpdateProduct from '@/hooks/useUpdateProduct';
import { UserType } from '@/types/User';
import { useParams } from 'react-router-dom';
import useDeleteImage from '@/hooks/useDeleteImage';
import { ERROR_MESSAGES } from '@/utils/validations';
import useFetchProduct from '@/hooks/useFetchProduct';
import close from '@/assets/icon/close.svg';
import Alert from '@/components/modal/Alert';

export type ParamsType = {
  productId?: string;
};

export type AlertInfoType = {
  header: string;
  bodyText: string;
  pathUrl: string;
};

export default function ManageProduct() {
  const user = useUserStore((state) => state.user);
  const params = useParams();
  const { productId } = params;

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfoType>({
    header: '',
    bodyText: '',
    pathUrl: '',
  });

  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [errorProduct, setErrorProduct] = useState<string | null>('');

  // 상품 조회 -> client
  const { product, setProduct } = useFetchProduct(productId as string);

  // 상품 상태 변경 -> client
  const onChangeInput = useChangeInput(user as UserType, product, setProduct);

  // 이미지 업로드 -> client
  const { addImageHandler } = useUploadImage(
    user as UserType,
    product,
    setProduct,
    setErrorProduct
  );

  // 이미지 삭제 -> client
  const { deleteImageHandler } = useDeleteImage(setProduct, setImagesToDelete);

  // 상품 수정 -> query
  const { editProductHandler } = useUpdateProduct(
    params,
    product,
    imagesToDelete,
    setErrorProduct,
    setOpenAlert,
    setAlertInfo
  );

  // 상품 삭제
  const { deleteProductMutation } = useDeleteProduct(
    user as UserType,
    params,
    product,
    setOpenAlert,
    setAlertInfo
  );

  return (
    <>
      {/* body  */}
      <main className="w-full flex flex-col justify-center items-center pt-10">
        {/* 사진 첨부 */}
        <section className="w-4/5 h-52 grid grid-cols-4 justify-center items-center gap-3 px-5 relative border mb-10">
          {product.image.map((img) => (
            <div key={img} className="w-full h-4/5 relative ">
              <div className="w-full h-full max-h-52 overflow-hidden">
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
                <div>
                  <img src={close} alt="close" width={20} height={20} />
                </div>
              </button>
            </div>
          ))}
          <AddImageButton />
          {errorProduct == 'errorProductImage' ? (
            <div className="text-left mt-1 ml-2 text-xs text-red-500">
              {ERROR_MESSAGES[errorProduct]}
            </div>
          ) : null}
        </section>

        <ProductForm
          onChangeInput={onChangeInput}
          addImageHandler={addImageHandler}
          product={product}
          setProduct={setProduct}
          deleteProductHandler={deleteProductMutation.mutate}
          editProductHandler={editProductHandler}
          errorCode={errorProduct}
        />

        {openAlert && (
          <Alert>
            <Alert.Content>
              <Alert.Header header="Add Product" />
              <Alert.Body bodyText={alertInfo.bodyText} />
              <Alert.Footer pathUrl={alertInfo.pathUrl} />
            </Alert.Content>
          </Alert>
        )}
      </main>
    </>
  );
}
