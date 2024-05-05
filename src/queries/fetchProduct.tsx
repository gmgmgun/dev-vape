import { db } from '@/firebase';
import { ProductWithId } from '@/types/Product';
import { doc, getDoc } from 'firebase/firestore';

export default async function fetchProduct({
  queryKey,
}: {
  queryKey: unknown[];
}) {
  const [_key, productId] = queryKey as [string, string];

  try {
    if (productId !== undefined) {
      const docRef = doc(db, _key, productId);
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
        return product;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
