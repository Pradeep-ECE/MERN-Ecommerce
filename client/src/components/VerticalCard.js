import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import scrollTop from '../helper/scroolTop';
import formatCurrencyINR from '../helper/currencyFormatter';
import Context from '../context';
import { toast } from 'react-toastify';
import { addToCart } from '../services/user.service';

const VerticalCard = ({loading,data}) => {
    const {fetchCartProducts}=useContext(Context)
    console.log("Vertical--------->",data);
    

  const handleAddToCart=async(id)=>{
    const addCart= await addToCart(id)
    if(addCart.data.success){
      toast.success(addCart.data.message)
      fetchCartProducts();
    }
    if(addCart.data.error){
      toast.success(addCart.data.error)
    }

  }
  return (
    <div className="container mx-auto px-4 my-6 relative">
     
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all delay-200">
       
        {
          loading ? ( 
            data.map((product, index) => {
            return (
              <div className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow">
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse">
                </div>
                <div className="p-4 grid gap-3" key={index}>
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200">
                    
                  </h2>
                  <p className="capitalize p-1 py-2 animate-pulse rounded-full bg-slate-200"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full ">
                      
                    </p>
                    <p className="text-slate-500 line-through p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full">
                      
                    </p>
                  </div>
                  <button className="text-sm text-white px-3 py-2 rounded-full p-1 animate-pulse bg-slate-200">
                   
                  </button>
                </div>
              </div>
            );
          })):
          
          
          
          data.map((product, index) => {
          return (
            <Link to={`/product/${product?.id}`} replace  className="w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow" onClick={scrollTop}>
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                <img
                  src={product.productImage[0]}
                  alt="product"
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="capitalize">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium">
                    {formatCurrencyINR(product?.sellingPrice)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {formatCurrencyINR(product?.MRP)}
                  </p>
                </div>
                <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full" onClick={()=>{handleAddToCart({ productId: product?.id })}}>
                  add to cart
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default VerticalCard