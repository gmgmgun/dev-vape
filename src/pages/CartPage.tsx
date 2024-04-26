import React, { useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', quantity: 2, price: 20.0 },
    { id: 2, name: 'Product 2', quantity: 1, price: 50.0 },
    { id: 3, name: 'Product 3', quantity: 3, price: 10.0 },
  ]);

  const removeFromCart = () => {
    setCartItems(cartItems.filter((item) => item.id !== item.id));
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-full bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
            >
              <div className="flex w-2/5">
                <div className="w-20">
                  <img
                    src="https://via.placeholder.com/100"
                    alt={item.name}
                    className="w-full h-full rounded"
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.name}</span>
                  <button
                    onClick={() => removeFromCart()}
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <span className="text-center w-1/5 font-semibold text-sm">
                  {item.quantity}
                </span>
              </div>
              <div className="flex justify-center w-1/5">
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${item.price}
                </span>
              </div>
              <div className="flex justify-center w-1/5">
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${total}</span>
            </div>
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
