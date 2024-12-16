import React, { useContext, useEffect, useRef, useState } from "react";
import { getAllCategoryProduct } from "../services/product.service";
import formatCurrencyINR from "../helper/currencyFormatter.js";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { addToCart } from "../services/user.service.js";
import Context from "../context/index.js";
import { toast } from "react-toastify";
const VerticalCartProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const[scroll,setScroll]=useState(0)
  const scrollElement = useRef()

  const fetchData = async () => {
    console.log("CATEGORY====>>>>",category);
    
    setLoading(true);
    const categoryProduct = await getAllCategoryProduct({ category: category });
    setLoading(false);
    setData(categoryProduct.data);
  };
  const {fetchCartProducts}=useContext(Context)
 
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

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight=()=>{
    scrollElement.current.scrollLeft+=300
  }
  const scrollLeftt=()=>{
    scrollElement.current.scrollLeft-=300
  }
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h3 className="text-2xl font-semibold py-4">{heading}</h3>
      <div className="flex items-center gap-6 overflow-x-scroll scrollbar-none transition-all delay-200" ref={scrollElement}>
        <button className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block" onClick={scrollLeftt}>
          <FaAngleLeft />
        </button>
        <button className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block" onClick={scrollRight}>
          <FaAngleRight />
        </button>
        {
          loading ? ( 
            data.map((product, index) => {
            return (
              <div className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow">
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse">
                </div>
                <div className="p-4 grid gap-3">
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
            <Link to={`product/${product?.id}`} className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow">
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
                <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full" onClick={()=>handleAddToCart({ productId: product?.id })}>
                  add to cart
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalCartProduct;
