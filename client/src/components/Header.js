import React from 'react'
import { Logo } from './Logo'
import { FcSearch } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
import user from '../assest/user.png'
import { Link } from 'react-router-dom';


export const Header = () => {
  return (
   <header className='h-16 shadow-md  bg-white'>
    <div className='h-full flex items-center container mx-auto px-4 justify-between'>
      <div className='cursor-pointer'>
      <Link to={'/'}>
        <Logo width={90} height={50} />
      </Link>
      </div>
      <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
        <input type='text' placeholder=' search product Here' className='w-full outline-none'/>
        <div className='text-lg min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full '>
        <FcSearch  className='cursor-pointer'/>
        </div>
      </div>
      <div className='flex items-center gap-5'>
        <div className='text-3xl cursor-pointer'>
        <img src={user} alt='empty'   className='h-9 w-9'/> 
        </div>
        <div className='text-2xl relative cursor-pointer'>
          <span><FaShoppingCart className='h-7 w-7'/></span>

          <div className='bg-red-600 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-2'> 
              <p className='text-sm'>0</p>
          </div>
        </div>

        <div>
        <Link to={'/login'}className='px-2 bg-red-600 rounded-full py-1 text-white hover:bg-red-700'>
          Login
          </Link>
        </div>
      </div>
    </div>
   </header>
  )
}
