import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import arrowRight from '@/assets/icon/arrow-right.svg';
import { ICategory } from '@/types/Category';
import { fetchProducts } from '@/queries/fetchProducts';
import CarouselContainer from '@/components/container/CarouselContainer';

interface ICategoryContainer {
  category: ICategory;
}

export const CategoryContainer = ({ category }: ICategoryContainer) => {
  const query = useQuery(
    ['product', 'productCategory', category.korean, 8],
    fetchProducts
  );
  return (
    <section>
      <Link
        to={`/category/${category.url}`}
        className="w-fit flex text-left mb-2 ml-2"
      >
        <div className="flex items-center">
          <div>{category.korean}</div>
          <img src={arrowRight} alt="arrow-right" />
        </div>
      </Link>

      <CarouselContainer products={query.data} />
    </section>
  );
};
