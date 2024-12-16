const router = require("express").Router({ mergeParams: true });
const { TE, to, ReE, ReS } = require("../../global_functions.js");
const categoryService = require("../../services/category/category.service.js");
const authToken = require("../../middleware/authToken.js");

const addCategory = async (req, res) => {
    let categoryData = req?.body ? req.body : null;
    categoryData["createdBy"]=req.user.id;
    
    
    let [err, data] = await to(categoryService.addCategory(categoryData));
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
  router.post("/category",authToken,addCategory)
  module.exports={router,addCategory}