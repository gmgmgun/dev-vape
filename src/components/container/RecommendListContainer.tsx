import React from 'react';
import { ProductWithId } from '@/types/Product';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import ProductCardForHome from '@/components/card/ProductCardForHome';
import { UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';

export default function RecommendContainer({
  products,
}: {
  products: UseQueryResult<ProductWithId[] | undefined, unknown>;
}) {
  const params = useParams();

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full h-80 flex justify-between gap-5"
    >
      <CarouselContent>
        {products.data &&
          products.data
            .filter((product) => product.id !== params.productId)
            .map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/4 lg:basis-1/4"
              >
                <ProductCardForHome product={product} />
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
}
