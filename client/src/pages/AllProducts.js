import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct.js';
import { deleteProduct, getAllProduct } from '../services/product.service.js';
import { toast } from 'react-toastify';
import { MdModeEditOutline } from "react-icons/md";
import EditProduct from './EditProduct.js';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import formatCurrencyINR from '../helper/currencyFormatter.js';

export const AllProducts = () => {
  const [showUploadProduct, setShowUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [checkedItems, setCheckedItems] = useState({}); // Track individual checkboxes
  const [openProductEdit, setOpenProductEdit] = useState(false);
  const [productData, setProductData] = useState({
    id: ''
  });

  const fetchAllProducts = async () => {
    try {
      const allProductDetails = await getAllProduct();
      if (allProductDetails.success) {
        setAllProducts(allProductDetails.data.rows);
        
      }
      if (allProductDetails.error) {
        toast.error(allProductDetails.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 const handleDeleteProducts=async(data)=>{
  console.log("DELETE+++++++",data);
  const confirm=window.confirm("Are you sure you want to delete this product?")
  if (confirm) {
  const productDeleteResponse= await deleteProduct(data)
  console.log(productDeleteResponse);
  if(productDeleteResponse.success){
    fetchAllProducts();
    toast.success(productDeleteResponse.message)
  }
}
  

 }

  const logData = async(ele) => {
    console.log("ele", ele);
    setProductData(ele);
    console.log("productData", productData);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Function to handle the "select all" checkbox
  const handleSelectAll = () => {
    const newCheckedItems = {};
    allProducts.forEach((_, index) => {
      newCheckedItems[index] = !Object.values(checkedItems).every(Boolean); // Toggle all
    });
    setCheckedItems(newCheckedItems);
  };

  // Function to handle individual checkbox change
  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index] // Toggle the individual checkbox state
    }));
  };

  return (
    <div className="container mx-auto my-6 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">All Products</h2>
        <button
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-2 px-4 rounded-full"
          onClick={() => setShowUploadProduct(true)}
        >
          Add Product
        </button>
      </div>{allProducts[0] ?
      (<table className="min-w-full border-collapse rounded-2xl overflow-hidden product-table">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-8 px-8 text-left text-sm font-semibold uppercase tracking-wider">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-blue-600" 
                onChange={handleSelectAll} // Handle select all checkbox click
                checked={Object.values(checkedItems).every(Boolean)} // Check if all are selected
              />
            </th>
           {/* <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Customer Id</th>*/}
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Brand</th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Selling Price</th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Product Image</th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((ele, index) => (
            <tr key={index} className="transition-transform duration-300 hover:bg-blue-100 transform hover:scale-105">
              <td className="py-8 px-8 text-left">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-4 w-4 text-blue-600" 
                  checked={checkedItems[index] || false} // Keep the checkbox state in sync
                  onChange={() => handleCheckboxChange(index)} // Handle individual checkbox change
                />
              </td>
              {/*<td className="py-8 px-8 border-b border-gray-300 text-gray-700">{index + 1}</td>*/}
              <td className="py-4 px-4 border-b border-gray-300 text-gray-700">{ele.productName}</td>
              <td className="py-4 px-4 border-b border-gray-300 text-gray-700">{ele.brandName}</td>
              <td className="py-4 px-4 border-b border-gray-300 text-gray-700 font-semibold">{formatCurrencyINR(ele.sellingPrice)}</td>
              <td className="py-4 px-4 border-b border-gray-300">
                <img
                  src={ele.productImage[0]}
                  alt={ele.productName}
                  className="w-12 h-12 object-cover rounded-lg border border-gray-300 shadow"
                />
              </td>
              <td className="py-4 px-4 border-b border-gray-300">
                <button className="action-btn bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-100 py-1 px-3 rounded transition duration-300">
                <GrView />
                </button>
                <button
                  className="bg-transparent border border-green-600 text-green-600 hover:bg-green-100 py-1 px-3 rounded transition duration-300"
                  onClick={() => {
                    setOpenProductEdit(true);
                    logData(ele);
                  }}
                >
                  <MdModeEditOutline />
                </button>
                <button className="action-btn bg-transparent border border-red-600 text-red-600 hover:bg-red-100 py-1 px-3 rounded transition duration-300"
                onClick={()=>handleDeleteProducts(ele)}
                >
                <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>) :<p>no Products</p>}

      {/* UploadProduct component */}
      {showUploadProduct && (
        <UploadProduct onClose={() => setShowUploadProduct(false)} 
        fetchAllProducts={fetchAllProducts}/>
      )}
      {/*  Edit Product */}
      {
        openProductEdit && (<EditProduct  onClose={() => setOpenProductEdit(false)} 
        EditProductDetails={productData}
        fetchAllProducts={fetchAllProducts}
        />)
      }
    </div>
  );
};
