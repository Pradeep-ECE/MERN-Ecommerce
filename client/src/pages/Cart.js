import React, { useContext, useEffect, useState } from "react";
import {
  deleteCartProduct,
  getCartProduct,
  updateCartProduct,
} from "../services/user.service";
import Context from "../context";
import formatCurrencyINR from "../helper/currencyFormatter";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {cartProductCount,fetchCartProducts} = useContext(Context);
  const [updateData, setUpdateData] = useState({ quantity: 0 });
  const loadingCart = new Array(cartProductCount).fill(null);

  
  console.log("loading",loading)
  const fetchCartData = async () => {
    // setLoading(true);
     await getCartProduct().then((res)=>{
      if(res){
        setLoading(false);
        console.log("CARTDATA=======<<<>>><<<>>>", res);
        setData(res?.data?.rows);
      }
      // if (cartProducts.success) {
      // }
    });
   
  };
  useEffect(() => {
    
    fetchCartData();
  }, []);

  const deleteCart = async (id) => {
    const deleteCart = await deleteCartProduct(id);
    if (deleteCart.success) {
      console.log("deleteCart=====>>>>>>", deleteCart);

      toast.success(deleteCart.message);
      fetchCartData();
      fetchCartProducts();
    }
  };
  const updateQuantity = async (qty, method, id) => {
    console.log("UpdateDATA", data);

   let updatedcartData={
      id:id,
      quantity:   method === "+" ? qty + 1 : qty - 1,
   }
  


    console.log("UPDATE QUANTITY", qty + 1);
    // if(qty<1){
    //   deleteCart(id)
    // }

    if (qty >= 1) {
      setData((prevData) => {
        console.log("Previous Data:", prevData);
        const updatedData = prevData.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  method === "+" ? item.quantity + 1 : item.quantity - 1,
              }
            : item
        );

        console.log("Updated Data:", updatedData);
        return updatedData;
      });
    }
    // const updatedcartData = data.find((item) =>
    //   item.id === id
    //     ? {
    //         item,
    //       }
    //     : null
    // );
    const updateCart = await updateCartProduct(updatedcartData);
    if (updateCart.success) {
      toast.success(updateCart.message);
    }
  };
console.log(loading);
const totalQty=data.reduce((prev,current)=> prev+current.quantity,0)
const totalPrice=data.reduce((prev,current)=> prev+(current?.quantity *current?.product?.sellingPrice),0)
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {!data?.length && !loading && <p className="bg-white py-5">No Data</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/**View Product*/}
        <div className="w-full max-w-3xl">
          {loading
            ? 
            loadingCart.map((el,ind) => (
                <div
                  key={ind}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data?.map((cart, index) => {
                return (
                  <div
                    key={cart?.id + "add to cart Loading"}
                    className="w-full bg-slate-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr] "
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={cart?.product?.productImage[0]}
                        alt="product"
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      <div className="absolute right-0 text-red-600 rounded p-2 hover:bg-red-600 hover:text-white cursor-pointer">
                        {/** Delete Product */}
                        <MdDelete onClick={() => deleteCart(cart?.id)} />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {cart?.product?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {cart?.product?.category}
                      </p>
                     <div className='flex items-center justify-between'> <p className="text-red font-medium text-lg">
                        {formatCurrencyINR(cart?.product?.sellingPrice)}
                      </p>
                       <p className="text-slate-600 font-semibold text-lg">
                        {formatCurrencyINR(cart?.product?.sellingPrice *cart?.quantity )}
                      </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="p-1 border w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white"
                          onClick={() =>
                            updateQuantity(cart?.quantity, "-", cart?.id)
                          }
                        >
                          -
                        </button>
                        <span>{cart?.quantity}</span>
                        <button
                          className="p-1 border w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white"
                          onClick={() =>
                            updateQuantity(cart?.quantity, "+", cart?.id)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/**Total Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-200 animate-pulse">
              total
            </div>
          ) : (
            <div className="h-36 bg-white">
            <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
              <p>Quantity</p>
              <p>{totalQty}</p>
            
            </div>
            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
            <p>Total Price</p>
            <p>{formatCurrencyINR(totalPrice)}</p>
            </div>
            <div className="flex items-center justify-center">
            <button className="bg-blue-600 p-2 text-white w-28 rounded hover:bg-blue-300">CheckOut</button>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
