import React, { useState } from 'react';
// import dotenv from "dotenv";
import { IoCloseSharp } from "react-icons/io5";
import { addProduct } from '../services/product.service';
// import imageToBase64 from '../helper/imageToBase54';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../helper/imageUpload';
import { MdDelete } from "react-icons/md";
import productCategory from '../helper/productCategory';
// dotenv.config();
const UploadProduct = ({ onClose,fetchAllProducts }) => {
  const [productDetails, setProductDetails] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    MRP: '',
    sellingPrice: '',
  });

  // const [imagePreview, setImagePreview] = useState(null); // To store the image preview
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    console.log("process.env.CLOUDINARY_NAME",process.env.CLOUDINARY_NAME);
    
    // const imagePic = await imageToBase64(file);
    // console.log('imagePic....',imagePic);
    // if (imagePic) {
    //   setProductDetails(prevDetails => ({
    //     ...prevDetails,
    //     productImage: imagePic
    //   }));
    //   // Set the image preview URL
    //   setImagePreview(URL.createObjectURL(file));
    // }
    const uploadProductImage= await uploadImage(file)
    console.log("uploadProductImageuploadProductImageupload============",uploadProductImage);
    setProductDetails(prevDetails => ({
          ...prevDetails,
          productImage: [...prevDetails.productImage,
            uploadProductImage.url]
        }));
    
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
// console.log("oncloseoncloseoncloseoncloseoncloseoncloseoncloseoncloseoncloseoncloseoncloseonclose",onClose());

  
  // console.log(JSON.parse(JSON.stringify(formData)));
  // console.log("productDetails==========",productDetails);
  try{
    const addProd= await addProduct(productDetails)
    console.log("addProdaddProdaddProdaddProd",addProd.data.error);
    
    if(addProd.data.success){
      console.log("========================================================");
      toast.success(addProd.data.message)
      navigate("/admin-panel/all-products")
      fetchAllProducts()
      onClose();
    }
    if(addProd.data.error){
      toast.error(addProd.data.error)
    }
    console.log(addProd);
  }catch(error){
      console.error(error.message);
      
  }
    // console.log([...formData.entries()]);
  };
  const handleDeleteProductImage = async(index)=>{
    console.log("image index",index)
    
    const newProductImage = [...productDetails.productImage]
    newProductImage.splice(index,1)

    setProductDetails((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
    
  }

  return (
    <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl h-full max-h-[85%] overflow-y-auto transition-all duration-300 ease-in-out'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='font-bold text-2xl text-gray-700 transition-colors duration-300 ease-in-out'>Add Product</h2>
          <div className='cursor-pointer text-2xl hover:text-red-600 transition-colors duration-300 ease-in-out' onClick={onClose}>
            <IoCloseSharp />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className='transition-all duration-300 ease-in-out'>
            <label className='block text-gray-600 font-medium transition-colors duration-300 ease-in-out'>Product Name</label>
            <input
              type='text'
              name='productName'
              value={productDetails.productName}
              onChange={handleChange}
              className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out'
              placeholder="Enter product name"
              required
            />
          </div>
          <div className='transition-all duration-300 ease-in-out'>
            <label className='block text-gray-600 font-medium transition-colors duration-300 ease-in-out'>Brand Name</label>
            <input
              type='text'
              name='brandName'
              value={productDetails.brandName}
              onChange={handleChange}
              className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out'
              placeholder="Enter brand name"
              required
            />
          </div>
          <div className='transition-all duration-300 ease-in-out'>
            <label className='block text-gray-600 font-medium transition-colors duration-300 ease-in-out'>Category</label>
              <select required value={productDetails.category} name='category' onChange={handleChange} className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out'>
                  <option value={""}>Select Category</option>
                  {console.log("productCategory",productCategory)}
                  
                  {
                    productCategory.map((el,index)=>{
                      return(
                        <option value={el.value} key={el.value+index}>{el.name}</option>
                      )
                    })
                  }
              </select>
          </div>
          <div>
            <label htmlFor='productImage' className='block text-gray-600 font-medium transition-colors duration-300 ease-in-out'>Product Image</label>
              <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                          <span className='text-4xl'><FaCloudUploadAlt/></span>
                          <p className='text-sm'>Upload Product Image</p>
                          <input type='file' id='uploadImageInput'  className='hidden' onChange={handleFileChange}/>
                        </div>
              </div>
              </label>
              <div>
              {
                productDetails?.productImage[0] ? (
                    <div className='flex items-center gap-2'>
                        {
                          productDetails.productImage.map((el,index)=>{
                            return(
                              <div className='relative group'>
                                  <img 
                                    src={el} 
                                    alt={el} 
                                    width={80} 
                                    height={80}  
                                    className='bg-slate-100 border cursor-pointer'  
                                   // onClick={()=>{
                                      //setOpenFullScreenImage(true)
                                      //setFullScreenImage(el)
                                   // }}
                                    />

                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                      <MdDelete/>  
                                    </div>
                              </div>
                              
                            )
                          })
                        }
                    </div>
                ) : (
                  <p className='text-red-600 text-xs'>*Please upload product image</p>
                )
              }
              
          </div>
          </div>
          <div className='transition-all duration-300 ease-in-out'>
            <label className='block text-gray-600 font-medium transition-colors duration-300 ease-in-out'>Description</label>
            <textarea
              name='description'
              value={productDetails.description}
              onChange={handleChange}
              className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out'
              placeholder="Enter product description"
              rows={4}
              required
            />
          </div>
          <div className='grid grid-cols-2 gap-4 transition-all duration-300 ease-in-out'>
            <div>
              <label className='block text-gray-600 font-medium transition-colors duration-300 ease-in-out'>MRP</label>
              <input
                type='number'
                name='MRP'
                value={productDetails.MRP}
                onChange={handleChange}
                className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out'
                placeholder="Enter MRP"
                required
              />
            </div>
            <div>
              <label className='block text-gray-600 font-medium transition-colors duration-300 ease-in-out'>Selling Price</label>
              <input
                type='number'
                name='sellingPrice'
                value={productDetails.sellingPrice}
                onChange={handleChange}
                className='w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out'
                placeholder="Enter selling price"
                required
              />
            </div>
          </div>
          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105'
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
