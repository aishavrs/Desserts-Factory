import React, { useContext } from 'react'
import { desserts } from '../../data'
import SingleDessert from './SingleDessert'
import { CartContext } from '../Context/CartContext'

export default function AllDesserts() {
  const {cart} = useContext(CartContext)
  return (
    <div className='grid grid-cols-[250px]  lg:grid-cols-[250px_250px_250px] gap-5 p-10 items-center justify-center '>
        {desserts.map((dessert) => {
          const inCart = cart.some((cartItem)=>cartItem.id === dessert.id)
            return <SingleDessert key={dessert.id} 
            {...dessert} {...inCart}/>
        })}
    </div>
  )
}