const { to, TE } = require("../../global_functions");
const Category = require("../../models/").category;
const { Op,fn,col } = require("sequelize");
const User = require("../../models/").user;

const addCategory = async (data) => {
    let [err, userData] = await to(User.findByPk(data.createdBy));
    if (err) {
      return TE(err.message);
    }
    if (!userData.dataValues.isAdmin) {
      return TE("Not Autorized");
    }
    if (userData.dataValues.isAdmin) {
      let [err, addProductData] = await to(Category.create(data));
      if (err) {
        return TE(err.message);
      }
      if (addProductData) {
        return addProductData;
      }
    }
  };

  module.exports = {addCategory};
