const { to, TE } = require("../../global_functions");
const cartProduct = require("../../models/").cartProduct;
const Product = require("../../models/").product;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailService = require("../mail.service.js");
const CryptoJS = require("crypto-js");
const User = require("../../models/").user;

const addCartProduct = async (data) => {
  console.log("PRODUCTDATA=====", data);

  let [err, userData] = await to(
    User.findOne({
      where: { id: data.userId },
    })
  );
  if (err) {
    return TE(err.message);
  }
  if (!userData) {
    return TE("Please LogIn");
  }
  if (userData) {
    console.log("===========================>");

    let [error, existCart] = await to(
      cartProduct.findOne({
        where: { userId: data.userId, productId: data.productId },
      })
    );
    if (error) {
      return TE(error.message);
    }
    if (existCart) {
      console.log("============                ===============>");
      console.log(existCart);

      return TE("Product Already Exist in cart");
    }

    let [cartError, cartData] = await to(cartProduct.create(data));
    if (cartError) {
      return TE(cartError.message);
    }
    if (cartData) {
      return cartData;
    }
  }
};

const getAllCartProduct = async (userId) => {
  console.log("======DATA============", data);

  let [err, cartData] = await to(
    cartProduct.findAndCountAll({
      where: { userId: userId, isDeleted: false },
      include: [
        {
          model: Product,
          attributes: [
            "id",
            "productName",
            "brandName",
            "sellingPrice",
            "productImage",
            "description",
            "MRP",
            "category",
          ], // Select required fields
        },
      ],
    })
  );
  if (err) {
    return TE(err.message);
  }
  if (cartData) {
    console.log(cartData);
    return cartData;
  }
};

const deleteCartProduct = async (cartId, userId) => {
  console.log(cartId, userId);

  const currentTimestamp = new Date();
  let [error, cartData] = await to(
    cartProduct.findOne({
      where: {
        id: cartId,
        userId: userId,
        isDeleted: false,
      },
    })
  );
  if (error) {
    console.log(error);

    return TE(error.message);
  }
  if (cartData) {
    console.log("cacartDatartData", cartData);

    let [err, data] = await to(
      cartProduct.update(
        {
            isDeleted: true,
            deletedAt: currentTimestamp,
        },
        {
            where: {
                id: cartId,
                userId: userId,
            },
        }
    )
);
    if (err) {
        console.log(err.message);
        
      return TE (err.message);
    }
    if (data) {
      return data;
    }
  }
};

const updateCartProduct = async (updateData) => {
    console.log('==================================================================================================',updateData);
    let [error, cartData] = await to(
      cartProduct.findOne({
        where: {
          id: updateData.id,
          userId: updateData.userId,
          isDeleted: false,
        },
      })
    );
    if (error) {
      console.log(error);
  
      return TE(error.message);
    }
    if (cartData) {
      console.log("cacartDatartData", cartData);
  
      let [err, data] = await to(
        cartProduct.update(
          {
            quantity: updateData.quantity
          },
          {
            where: {
              id: updateData.id,
              userId: updateData.userId,
            },
          }
        )
      );
      if (err) {
        console.log(err.message);
  
        return TE(err.message);
      }
      if (data) {
        return data;
      }
    }
  };

module.exports = { addCartProduct, getAllCartProduct, deleteCartProduct,updateCartProduct };
