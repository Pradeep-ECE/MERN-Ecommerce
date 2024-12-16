import React from "react";
import { useState, useEffect } from "react";
import { getSingleCategoryProduct } from "../services/product.service";
import { Link } from "react-router-dom";

export const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCategoryProduct = async () => {
    try {
      setLoading(true);
      const response = await getSingleCategoryProduct();
      console.log("responseresponseresponseresponseresponse", response.data);
      setCategoryProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {    
    fetchCategoryProduct();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {
            loading ? (
          <div className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"></div>
        ) : (
          categoryProduct.map((product, index) => {
            return (
              <Link to={"product-category/" + product?.category} key={product?.category}>
                <div className="cursor-pointer">
                  <div className="  bg-slate-200 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product.category}
                      className="p-4 h-full object-scale-down  mix-blend-multiply hover:scale-125 transistion-all duration-150"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize ">
                    {product.category}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};
