import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ProductWithId } from '@/types/Product';
import { useParams } from 'react-router-dom';
import { ERROR_MESSAGES } from '@/utils/validations';
import { categories } from '@/types/Category';

interface ProductFormProps {
  onChangeInput: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  product: ProductWithId;
  addImageHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setProduct: (
    value: ProductWithId | ((prevState: ProductWithId) => ProductWithId)
  ) => void;
  addProductHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteProductHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  editProductHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  errorCode: string | null;
}

export default function ProductForm({
  onChangeInput,
  addImageHandler,
  product,
  setProduct,
  addProductHandler,
  deleteProductHandler,
  editProductHandler,
  errorCode,
}: ProductFormProps) {
  const params = useParams();
  return (
    <form className="w-1/2">
      <div>
        <input
          type="file"
          id="inputFile"
          name="image"
          // accept=".jpg, .jpeg, .png"
          multiple
          onChange={addImageHandler}
          className="hidden"
          required
        />
      </div>

      <section className="flex flex-col gap-5 ">
        <div>
          <Input
            type="text"
            placeholder="상품 이름"
            value={product.name}
            name="name"
            className=""
            onChange={onChangeInput}
            required
          />
          {errorCode == 'errorProductName' ? (
            <div className="text-left mt-1 ml-2 text-xs text-red-500">
              {ERROR_MESSAGES[errorCode]}
            </div>
          ) : null}
        </div>

        <div>
          <Input
            type="number"
            placeholder="상품 가격"
            value={product.price}
            name="price"
            className=""
            onChange={onChangeInput}
            required
          />
          {errorCode == 'errorProdcutPrice' ? (
            <div className="text-left mt-1 ml-2 text-xs text-red-500">
              {ERROR_MESSAGES[errorCode]}
            </div>
          ) : null}
        </div>

        <div>
          <Input
            type="number"
            placeholder="상품 수량"
            value={product.quantity}
            name="quantity"
            className=""
            onChange={onChangeInput}
            required
          />
          {errorCode == 'errorProdcutQuantity' ? (
            <div className="text-left mt-1 ml-2 text-xs text-red-500">
              {ERROR_MESSAGES[errorCode]}
            </div>
          ) : null}
        </div>

        <div>
          <Textarea
            placeholder="상품 설명"
            name="description"
            value={product.description}
            className=""
            onChange={onChangeInput}
            required
          ></Textarea>
          {errorCode == 'errorProductDescription' ? (
            <div className="text-left mt-1 ml-2 text-xs text-red-500">
              {ERROR_MESSAGES[errorCode]}
            </div>
          ) : null}
        </div>

        <Select
          value={product.category}
          onValueChange={(value) => (
            setProduct({ ...product, category: value }), console.log(product)
          )}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.korean}>
                  {category.korean}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errorCode == 'errorProductCategory' ? (
          <div className="text-left mt-1 ml-2 text-xs text-red-500">
            {ERROR_MESSAGES[errorCode]}
          </div>
        ) : null}

        {!params.productId ? (
          <Button onClick={addProductHandler} className="w-full">
            Add
          </Button>
        ) : (
          <div className="flex w-full justify-around gap-5">
            <Button onClick={editProductHandler} className="w-full">
              Edit
            </Button>
            <Button
              onClick={deleteProductHandler}
              className="w-full bg-red-600 hover:bg-red-900"
            >
              Delete
            </Button>
          </div>
        )}
      </section>
    </form>
  );
}
