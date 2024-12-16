import {
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
} from "./common.service";

const token = localStorage.getItem("token");

export const addProduct = async (data) => {
  console.log("addProdaddProdaddProd======", data);
  const productDetails = data ? data : null;

  const addProductRsponse = await postMethod(
    `product/addProduct`,
    {
      headers: {
        "content-type": "application/json",
        authorization: token ? token : null,
      },
      withCredentials: true,
    },
    productDetails
  );
  return addProductRsponse;
};

export const getAllProduct = async (data) => {
  console.log("addProdaddProdaddProd======", data);

  const getAllProduct = await getMethod(
    `product/all-products`,
    {
      headers: {
        "content-type": "application/json",
        authorization: token ? token : null,
      },
      withCredentials: true,
    },
    data
  );
  return getAllProduct;
};

export const updateProduct = async (data) => {
  console.log("addProdaddProdaddProd======", data);

  const updateProductRsponse = await putMethod(
    `product/update-product`,
    {
      headers: {
        "content-type": "application/json",
        authorization: token ? token : null,
      },
      withCredentials: true,
    },
    data
  );
  return updateProductRsponse;
};

export const deleteProduct = async (data) => {
  console.log("addProdaddProdaddProd======", data);

  const deleteProductRsponse = await putMethod(
    `product/delete-product/${data.id}`,
    {
      headers: {
        "content-type": "application/json",
        authorization: token ? token : null,
      },
      withCredentials: true,
    },
    data
  );
  return deleteProductRsponse;
};

export const getSingleCategoryProduct = async () => {
  console.log("getCategoryProduct======",);

  const getCategoryProductRsponse = await getMethod(
    `product/product-category`,
    {
      headers: {
        "content-type": "application/json",
        authorization: token ? token : null,
      },
      withCredentials: true,
    },
    null
  );
  return getCategoryProductRsponse;
};

export const getAllCategoryProduct = async (data) => {
  console.log("getCategoryProduct======",);
  console.log(data);

  const getCategoryProductRsponse = await getMethod( 
    
    
    `product/category-product`,
    {
      headers: {
        "content-type": "application/json",
        authorization: token ? token : null,
      },
      withCredentials: true,
    },
    data
  );
  return getCategoryProductRsponse;
};

export const getProductDetails  = async (data) => {
  console.log("getProductDetails======",);
  console.log(data);

  const getProductDetails  = await getMethod( 
    `product/${data}`,
    {
      headers: {
        "content-type": "application/json",
        authorization: token ? token : null,
      },
      withCredentials: true,
    },
    null
  );
  return getProductDetails ;
};

export const product_Search  = async (data) => {
  console.log("getProductDetails======",);
  console.log(data);

  const searchProducts  = await getMethod( 
    `product/search-product`,
    {
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: token } : {}),
      },
      withCredentials: token? true : false,
    },
    data
  );
  return searchProducts ;
};

