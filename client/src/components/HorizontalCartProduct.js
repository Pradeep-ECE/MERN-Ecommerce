import React, { useContext, useEffect, useRef, useState } from "react";
import { getAllCategoryProduct } from "../services/product.service";
import formatCurrencyINR from "../helper/currencyFormatter.js";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { addToCart, getCartProduct } from "../services/user.service.js";
import { toast } from "react-toastify";
import Context from "../context/index.js";
const HorizontalCartProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const loadingList = new Array(13).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await getAllCategoryProduct({ category: category });
    setLoading(false);
    console.log(
      "categoryProduct===>",
      categoryProduct.data.map((product, index) => {
        return product.id;
      })
    );

    setData(categoryProduct.data);
  };
  const {fetchCartProducts}=useContext(Context)
 
 
  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeftt = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  const handleAddToCart = async (data) => {
    const addCart = await addToCart(data);
    if (addCart.data.success) {
      toast.success(addCart.data.message);
      fetchCartProducts();
    }
    if (addCart.data.error) {
      toast.success(addCart.data.error);
    }
    const getCart = await getCartProduct();
  
  };
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h3 className="text-2xl font-semibold py-4">{heading}</h3>
      <div
        className="flex items-center gap-6 overflow-scroll scrollbar-none transition-all delay-200"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeftt}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {loading
          ? data.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse rounded-full p-1"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full "></p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full "></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                  <Link
                    to={`product/${product?.id}`}
                    className="flex bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]"
                  >
                    <img
                      src={product.productImage[0]}
                      alt="product"
                      className="object-scale-down h-full hover:scale-110 transition-all"
                    />
                  </Link>
                  <div className="p-4 grid">
                    <Link to={`product/${product?.id}`} className="grid">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                        {product?.productName}
                      </h2>
                      <p className="capitalize">{product?.category}</p>
                      <div className="flex gap-1">
                        <p className="text-red-600 font-medium">
                          {formatCurrencyINR(product?.sellingPrice)}
                        </p>
                        <p className="text-slate-500 line-through">
                          {formatCurrencyINR(product?.MRP)}
                        </p>
                      </div>
                    </Link>
                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                      onClick={() =>
                        handleAddToCart({ productId: product?.id })
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCartProduct;
