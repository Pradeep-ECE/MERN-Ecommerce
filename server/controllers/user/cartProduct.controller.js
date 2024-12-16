const router = require("express").Router({ mergeParams: true });
// const { TE, to, ReE, ReS } = require("../../global_functions.js");
const { TE, to, ReE, ReS } = require("../../global_functions.js");
const cartProductService = require("../../services/user/cartProduct.service.js");
const passport = require("passport");
const authToken = require("../../middleware/authToken.js");

const addCartProduct = async function (req, res) {
    let productData = req && req.body ? req.body : null;
    productData["userId"]=req?.user?.id ?req.user.id:null
    let [err, data] = await to(cartProductService.addCartProduct(productData));
    if (err)
      ReE(res, {
        success: false,
        message: err.message,
        code: 422,
        error:true
      });
    if (data)
      return ReS(res, {
        data: data,
        success: true,
        message: "Product added to the cart.",
        code: 200,
      });
  };

  const getAllCartProduct = async function (req, res) {
    userId=req?.user?.id ?req.user.id:null
    console.log("========userId===============",userId);
    
    let [err, data] = await to(cartProductService.getAllCartProduct(userId));
    if (err)
      ReE(res, {
        success: false,
        message: err.message,
        code: 422,
        error:true
      });
    if (data)
      return ReS(res, {
        data: data,
        success: true,
        message: "cart product fetched successfully",
        code: 200,
      });
  };
  const deleteCartProduct = async function (req, res) {
  const userId=req?.user?.id ?req.user.id:null
  const cartId= req?.params?.id
    console.log("========userId===============",userId);
    
    let [err, data] = await to(cartProductService.deleteCartProduct(cartId,userId));
    if (err)
      ReE(res, {
        success: false,
        message: err.message,
        code: 422,
        error:true
      });
    if (data)
      return ReS(res, {
        data: data,
        success: true,
        message: "cart product deleted successfully",
        code: 200,
      });
  };

  const updateCartProduct = async function (req, res) {
     
    const updateData= req?.body
    updateData['userId']=req?.user?.id ?req.user.id:null
     console.log("========userId===============",updateData);
      
      let [err, data] = await to(cartProductService.updateCartProduct(updateData));
      if (err)
        ReE(res, {
          success: false,
          message: err.message,
          code: 422,
          error:true
        });
      if (data)
        return ReS(res, {
          data: data,
          success: true,
          message: "cart product updated successfully",
          code: 200,
        });
    };
  


router.post("/cartProduct",authToken,addCartProduct)
router.get("/cartProduct",authToken,getAllCartProduct)
router.put("/cartProduct",authToken,updateCartProduct)
router.put("/cartProduct/:id",authToken,deleteCartProduct)

module.exports={router,addCartProduct,getAllCartProduct,deleteCartProduct,updateCartProduct}