const router = require("express").Router({ mergeParams: true });
const { TE, to, ReE, ReS } = require("../../global_functions.js");
const productService = require("../../services/product/product.service.js");
const authToken = require("../../middleware/authToken.js");


const addProduct = async (req, res) => {
  let productData = req?.body ? req.body : null;
  productData["createdBy"]=req.user.id;
  
  
  let [err, data] = await to(productService.addProduct(productData));
  if (err) {
    ReE(res, { message: err.message, code: 422 });
  }
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "Product created successfully",
      code: 200,
    });
};

const getAllProduct = async (req, res) => {
  let [err, data] = await to(productService.getAllProduct());
  if (err) {
    ReE(res, { message: err.message, code: 422 });
  }
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "Product fetched successfully",
      code: 200,
    });
};


const updateProducts = async (req, res) => {
  const updateData=req?.body;
  updateData["userId"]=req.user.id
  let [err, data] = await to(productService.updateProducts(updateData));
  if (err) {
    ReE(res, { message: err.message, code: 422 });
  }
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "Product updated successfully",
      code: 200,
    });
};

const deleteProduct = async (req, res) => {
  const updateData=req?.body;
  let id=req?.params?.id ? req.params.id : null;
  console.log("CONTROLLER>>>>>>>",id);
  updateData["userId"]=req.user.id
  let [err, data] = await to(productService.deleteProduct(updateData,id));
  if (err) {
    ReE(res, { message: err.message, code: 422 });
  }
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "Product deleted successfully",
      code: 200,
    });
};

const getSingleCategoryProduct = async (req, res) => {
  let [err, data] = await to(productService.getCategoryProduct());
  if (err) {
    ReE(res, { message: err.message, code: 422 });
  }
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "Product fetched successfully",
      code: 200,
    });
};

const getAllCategoryProduct = async (req, res) => {
  console.log("ENTEREDDD+++++++==");
  
  let category=req?.query
  console.log("category====>",category);
  
  let [err, data] = await to(productService.getCategoryProduct(category));
  if (err) {
    ReE(res, { message: err.message, code: 422 });
  }
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "Product fetched successfully",
      code: 200,
    });
};
const getOneProduct = async (req, res) => {
  console.log("ENTEREDDD+++++++==");
  
  let productId=req?.params?.id
  
  
  let [err, data] = await to(productService.getOneProductDetails(productId));
  if (err) {
    ReE(res, { message: err.message, code: 422 });
  }
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "Product Details fetched successfully",
      code: 200,
    });
};

const productSearch = async (req, res) => {
  let filterData={}
  if(req?.query?.product){
    filterData.product=req?.query?.product
  }
  if(req?.query?.category){
    console.log(req?.query?.category);
    
    filterData.category=req?.query?.category
  }
  console.log("filterData=========>",filterData);
  


  console.log('req?.query',req?.query.product);
  
  // const searchData=req?.query?.product;
  // console.log("asdfdssdfdsdfgfdfggf===",searchData);
  
  let [err, data] = await to(productService.productSearch(filterData));
  if (err) {
    ReE(res, { message: err.message, code: 422 });
  }
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "Product updated successfully",
      code: 200,
    });
};


router.post("/addProduct",authToken,addProduct)
router.get("/search-product",productSearch)
router.get("/all-products",getAllProduct)
router.put("/update-product",authToken,updateProducts)
router.put("/delete-product/:id",authToken,deleteProduct)
router.get("/product-category",getSingleCategoryProduct)
router.get("/category-product",getAllCategoryProduct)
router.get("/:id",getOneProduct)
module.exports={router,addProduct,getAllProduct,updateProducts,deleteProduct,getSingleCategoryProduct,getAllCategoryProduct,getOneProduct}