import { ProductWithId } from '@/types/Product';

export default function useDeleteImage(
  setProduct: (
    value: ProductWithId | ((prevState: ProductWithId) => ProductWithId)
  ) => void,
  setImagesToDelete: (
    value: string[] | ((prevState: string[]) => string[])
  ) => void
) {
  // 삭제할 이미지를 저장
  const deleteImageHandler = async (imageUrl: string) => {
    setImagesToDelete((prev) => [...prev, imageUrl]);

    setProduct((prev: ProductWithId) => ({
      ...prev,
      image: prev.image.filter(
        (prevImageUrl: string) => prevImageUrl !== imageUrl
      ),
    }));
  };
  return { deleteImageHandler };
}
