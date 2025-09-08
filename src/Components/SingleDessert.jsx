import React, { useContext, useState } from 'react';
import { desserts } from '../../data';
import { MdAddShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';
import { FaCircleMinus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { CartContext } from '../Context/CartContext';

export default function SingleDessert({ id, img, title, description, price }) {
 const {cart, handleAddToCart, handleQuantityIncrease, handleQuantityDecrease} = useContext(CartContext)

  const itemInCart = cart.find((cartItem) => cartItem.id === id);
  const isInCart = !!itemInCart;
  const itemQuantity = itemInCart?.quantity || 0;

  // const handleAddToCart = (selectedItem) => {
  //   const exists = cart.find((cartItem) => cartItem.id === selectedItem.id);
  //   if (exists) {
  //     toast.info(${selectedItem.title} is already in the cart);
  //   } else {
  //     setCart([...cart, { ...selectedItem, quantity: 1 }]);
  //     toast.success(${selectedItem.title} added to cart);
  //   }
  // };

  // const handleQuantityIncrease = (selectedItem) => {
  //   const item = cart.find((cartItem) => cartItem.id === selectedItem.id);
  //   if (item) {
  //     const updatedCart = cart.map((cartItem) =>
  //       cartItem.id === selectedItem.id
  //         ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //         : cartItem
  //     );
  //     setCart(updatedCart);
  //     toast.success(Increased quantity of ${selectedItem.title});
  //   } else {
  //     setCart([...cart, { ...selectedItem, quantity: 1 }]);
  //     toast.success(${selectedItem.title} added to cart);
  //   }
  // };

  // const handleQuantityDecrease = (selectedItem) => {
  //   const item = cart.find((cartItem) => cartItem.id === selectedItem.id);
  //   if (item) {
  //     if (item.quantity > 1) {
  //       const updatedCart = cart.map((cartItem) =>
  //         cartItem.id === selectedItem.id
  //           ? { ...cartItem, quantity: cartItem.quantity - 1 }
  //           : cartItem
  //       );
  //       setCart(updatedCart);
  //       toast.warn(Quantity of ${selectedItem.title} decreased);
  //     } else {
  //       const updatedCart = cart.filter((cartItem) => cartItem.id !== selectedItem.id);
  //       setCart(updatedCart);
  //       toast.warn(${selectedItem.title} removed from cart);
  //     }
  //   } else {
  //     toast.error(${selectedItem.title} not found in cart);
  //   }
  // };

  return (
    <div className='space-y-10 relative'>
      <img className='rounded-sm' src={img} alt={title} />
      <div>
        {isInCart ? (
          <div className='bg-red-500 rounded-4xl text-white py-2 px-5 absolute bottom-22 left-15 space-x-6 items-center'>
            <button onClick={() => handleQuantityDecrease(itemInCart)} className='cursor-pointer'><FaCircleMinus /></button>
            <span className='text-md'>{itemQuantity}</span>
            <button onClick={() => handleQuantityIncrease(itemInCart)} className='cursor-pointer'><FaPlusCircle /></button>
          </div>
        ) : (
          <button
            onClick={() =>
              handleAddToCart({ id, img, title, description, price })
            }
           className='flex justify-center items-center gap-2 border border-red-500 bg-white py-1 px-2 rounded-4xl absolute bottom-22 left-16 font-semibold cursor-pointer'>
            <span><MdAddShoppingCart color='red'/></span> Add to Cart
          </button>
        )}
      </div>
     <div>
       <p className='text-sm opacity-40'>{title}</p>
      <h1 className='font-semibold'>{description}</h1>
      <p className='text-rose-500 font-semibold'>${price.toFixed(2)}</p>
     </div>
    </div>
  );
}