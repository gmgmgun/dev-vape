import { ProductWithId } from '@/types/Product';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import ProductCardForHome from '@/components/card/ProductCardForHome';

export interface ProductContanierProps {
  products: ProductWithId[] | undefined;
}

export default function ProductContainer({ products }: ProductContanierProps) {
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
        {products &&
          products.map((product) => (
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
