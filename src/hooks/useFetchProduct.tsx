import { db } from '@/firebase';
import { ProductWithId } from '@/types/Product';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useFetchProduct(productId: string) {
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const docRef = doc(db, 'product', productId);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const product: ProductWithId = {
              docId: docSnapshot.id,
              id: data.id,
              sellerId: data.sellerId,
              name: data.name,
              price: data.price,
              quantity: data.quantity,
              description: data.description,
              category: data.category,
              image: data.image,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            };
            setProduct(product);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, setProduct };
}
