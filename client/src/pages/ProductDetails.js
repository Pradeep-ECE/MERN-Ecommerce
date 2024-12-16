import React, { useCallback, useContext, useEffect, useState } from "react";
import { getProductDetails } from "../services/product.service";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";
import formatCurrencyINR from "../helper/currencyFormatter";
import VerticalCartProduct from "../components/VerticalCartProduct";
import { addToCart,getCartProduct } from "../services/user.service";
import {toast } from 'react-toastify';
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Context from "../context";


const ProductDetails = () => {
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    MRP: "",
    sellingPrice: "",
  });
  const [loading, setLoading] = useState(true);
  const params = useParams();
  console.log("productDetails", params);
  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  const fetchProductDetails = async () => {
    setLoading(true);
    const productDetails = await getProductDetails(params.id);
    console.log("productDetails====>", productDetails);
    setProductData(productDetails?.data);
    setActiveImage(productDetails?.data?.productImage[0]);
    setLoading(false);
  };
  const productImageLoading = new Array(productData.productImage.length).fill(
    null
  );
  const [activeImage, setActiveImage] = useState(" ");
  const [zoomIn, setZoomIn] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  console.log("productImageLoading", productImageLoading);

  const handlehoverMouseImage = (imageUrl) => {
    setActiveImage(imageUrl);
  };
  const handleZoomImage = useCallback((e) => {
    console.log("CCCCCCC",productData.category);
    
    setZoomIn(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  },[zoomImageCoordinate])
  const handleZoomOut = () => {
    setZoomIn(false);
  };
  const {fetchCartProducts}=useContext(Context)
 
  const addProductToCart=async(data)=>{
    const addCart= await addToCart(data)
    if(addCart.data.success){
      toast.success(addCart.data.message)
      fetchCartProducts();
    }
    if(addCart.data.error){
      toast.success(addCart.data.error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/**Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          {loading ? (
            <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 animate-pulse rounded"></div>
          ) : (
            <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2 ">
              <img
                src={activeImage}
                alt="product"
                className="h-full w-full object-scale-down mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleZoomOut}
              />
              {/** Product Zoom */}
              {zoomIn && (
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[390px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div
                  className='min-h-[390px] min-w-[500px] overflow-hidden mix-blend-multiply scale-150'
                  style={{
                    background : `url(${activeImage})`,
                    backgroundRepeat : 'no-repeat',
                    backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `

                  }}
                >

                </div>
              </div>
              )}
            </div>
          )}
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageLoading.map((ele) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage"}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productData?.productImage?.map((imgUrl, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imgUrl}
                    >
                      <img
                        src={imgUrl}
                        alt="product"
                        className="w-ful h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => {
                          handlehoverMouseImage(imgUrl);
                        }}
                        onClick={() => {
                          handlehoverMouseImage(imgUrl);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/**Product Details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 w-full rounded-full inline-block "></p>
            <h2 className="text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse h-6 w-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 animate-pulse min-w-[100px] h-6 w-full "></p>

            <div className=" bg-slate-200 h-6 animate-pulse text-red-600 flex items-center"></div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse w-full">
              <p className=" text-red-600 bg-slate-200"></p>
              <p className="text-slate-400 line-through bg-slate-200"></p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button className="h-6 bg-slate-200 rounded animate-pulse w-full"></button>
              <button className="h-6 bg-slate-200 rounded animate-pulse w-full"></button>
            </div>

            <div>
              <p className="text-slate-500 font-medium my-1 bg-slate-200 animate-pulse h-4 w-full rounded"></p>
              <p className="h-10 bg-slate-200 rounded animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {productData?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {productData?.productName}
            </h2>
            <p className="capitalize text-slate-400">{productData?.category}</p>

            <div className="text-red-600 flex items-center">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className=" text-red-600">
                {formatCurrencyINR(productData.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {formatCurrencyINR(productData?.MRP)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white">
                Buy Now
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
              onClick={()=> addProductToCart({productId: productData?.id})}>
                Add to cart
              </button>
            </div>

            <div>
              <p className="text-slate-500 font-medium my-1">Description</p>
              <p>{productData?.description}</p>
            </div>
          </div>
        )}
      </div>

      {
        productData.category && <CategoryWiseProductDisplay category={productData.category} heading={"Recommended"} />
      }
    </div>
  );
};

export default ProductDetails;
