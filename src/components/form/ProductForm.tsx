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

interface FormProductProps {
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

export default function FormProduct({
  onChangeInput,
  addImageHandler,
  product,
  setProduct,
  addProductHandler,
  deleteProductHandler,
  editProductHandler,
  errorCode,
}: FormProductProps) {
  const params = useParams();
  return (
    <form className="w-1/2">
      <div>
        <input
          type="file"
          id="inputFile"
          name="productImage"
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
            value={product.productName}
            name="productName"
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
            value={product.productPrice}
            name="productPrice"
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
            value={product.productQuantity}
            name="productQuantity"
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
            name="productDescription"
            value={product.productDescription}
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
          value={product.productCategory}
          onValueChange={(value) => (
            setProduct({ ...product, productCategory: value }),
            console.log(product)
          )}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="입호흡">입호흡 액상</SelectItem>
              <SelectItem value="폐호흡">폐호흡 액상</SelectItem>
              <SelectItem value="기기">모드 / 기기</SelectItem>
              <SelectItem value="코일">코일 / 팟 / 기타</SelectItem>
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
