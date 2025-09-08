import React from 'react'
import Header from '../Components/Header'
import AllDesserts from '../Components/AllDesserts'
import Cart from '../Components/Cart'


export default function HomePage() {
  return (
    <div>
        <Header/>
        <main className='container mx-auto flex flex-col lg:flex-row gap-3'>
          <div className='flex flex-col lg:flex-row gap-3 bg-rose-50'>
            <AllDesserts/>
          </div>
         
         <div>
           <Cart />
         </div>
        </main>
        
    </div>
  )
}