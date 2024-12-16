const { to, TE } = require("../../global_functions");
const Product = require("../../models/").product;
const { Op, fn, col } = require("sequelize");
const category = require("../../models/category/category");
const User = require("../../models/").user;

const addProduct = async (data) => {
  let [err, userData] = await to(User.findByPk(data.createdBy));
  if (err) {
    return TE(err.message);
  }
  if (!userData.dataValues.isAdmin) {
    return TE("Not Autorized");
  }
  if (userData.dataValues.isAdmin) {
    let [err, addProductData] = await to(Product.create(data));
    if (err) {
      return TE(err.message);
    }
    if (addProductData) {
      return addProductData;
    }
  }
};

const getAllProduct = async () => {
  let [err, productData] = await to(
    Product.findAndCountAll({
      where: { isDeleted: false },
    })
  );
  if (err) {
    return TE(err.message);
  }
  if (productData) {
    return productData;
  }
};

const getCategoryProduct = async (data) => {
  let condition = data
    ? { where: { category: data.category } }
    : { attributes: [[fn("DISTINCT", col("category")), "category"]] };
  console.log(condition);

  const productByCategory = [];
  let [err, productData] = await to(Product.findAll(condition));
  if (err) {
    return TE(err.message);
  }
  if (data && productData) {
    console.log(productData);

    return productData;
  }
  if (productData) {
    //console.log(productData);

    for (const category of productData) {
      const categoryName = category.dataValues.category;
      console.log(categoryName);

      // Find a product within the current category
      let [err, product] = await to(
        Product.findOne({
          where: { category: categoryName },
        })
      );

      if (err) {
        console.log(err);
        continue;
      }

      if (product) {
        productByCategory.push(product);
      }
    }
  }

  console.log(productByCategory);
  return productByCategory;
};

const updateProducts = async (data) => {
  let [err, userData] = await to(User.findByPk(data.userId));
  if (err) {
    return TE(err.message);
  }
  if (!userData.dataValues.isAdmin) {
    return TE("Not Autorized");
  }
  if (userData.dataValues.isAdmin) {
    let [err, addProductData] = await to(
      Product.update(data, { where: { id: data.id } })
    );
    if (err) {
      return TE(err.message);
    }
    if (addProductData) {
      return addProductData;
    }
  }
};

const deleteProduct = async (data, id) => {
  console.log("SERVICEEEEEEEE", id);

  let [err, userData] = await to(User.findByPk(data.userId));
  if (err) {
    return TE(err.message);
  }
  if (!userData.dataValues.isAdmin) {
    return TE("Not Autorized");
  }
  if (userData.dataValues.isAdmin) {
    const currentTimestamp = new Date();

    let [err, addProductData] = await to(
      Product.update(
        { isDeleted: true, deletedAt: currentTimestamp },
        { where: { id: id } }
      )
    );
    if (err) {
      return TE(err.message);
    }
    if (addProductData) {
      return addProductData;
    }
  }
};

const getOneProductDetails = async (data) => {
  console.log("id", data);

  let [err, productDetails] = await to(
    Product.findOne({ where: { id: data } })
  );
  if (err) {
    return TE(err.message);
  }
  if (productDetails) {
    return productDetails;
  }
};

const productSearch = async (data) => {
  console.log("id", data);

  let whereCondition = {};
  if (data.product) {
    whereCondition = {
      productName: { [Op.iLike]: "%" + data.product + "%" },
      isDeleted: false,
    };
  }
  if (data.category) {
    whereCondition = {
      category:{ [Op.in]: data.category },
      isDeleted: false,
    };
  }
console.log("whereCondition=======>",whereCondition);

  let [err, productDetails] = await to(
    Product.findAll({
      where: whereCondition,
    })
  );
  if (err) {
    return TE(err.message);
  }
  if (productDetails) {

    return productDetails;
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  updateProducts,
  deleteProduct,
  getCategoryProduct,
  getOneProductDetails,
  productSearch,
};
