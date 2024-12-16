const { to, TE } = require("../../global_functions");
const User = require("../../models/").user;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailService = require("../mail.service.js");
const CryptoJS = require("crypto-js");

let Otp={}

const userSignUp = async function (data) {
  console.log(data);

  if (data && data.email) {
    let [mailErr, existEmail] = await to(
      User.findOne({
        where: {
          email: { [Op.iLike]: data.email },
          isDeleted: false,
        },
      })
    );
    if (mailErr) {
      return TE(mailErr.message);
    }
    if (existEmail) {
      return TE((info = "mail already exist"));
    } else {
      let [createErr, createData] = await to(User.create(data));
      if (createErr) {
        return TE(createErr.message);
      }
      if (createData) {
        // let encryptedOtp=encryptDetails(mailOtp,CONFIG.secretKey)
        // console.log(encryptedOtp);
        // let decrtpt=decryptDetails(encryptedOtp)
        // console.log("decrypt",decrtpt);

        // let signUpData={}
        // signUpData['user']=createData.dataValues
        // signUpData={
        //   ...signUpData,
        //   Otp: encryptedOtp
        // }
        // return signUpData
        let otpVerification= await sendOtp(createData.dataValues.email)

        return {createData, otpVerification};
      }
    }
  }
};

const sendOtp = async function(email){
  let mailOtp=Math.floor(Math.random() * 999999);
  if(mailOtp<=99999){
    mailOtp=mailOtp*10;
  }
  Otp[email]=mailOtp
  content=`<p>your otp for verification %mailOtp%</p>`
  console.log("OTP-----",Otp);
  let success=await mailService.sendMail(email,content,{mailOtp:mailOtp})
  return success;
}

const userSignIn = async function (data) {
  let email = data && data.email ? data.email : null;
  let password = data && data.password ? data.password : null;
  let [logInErr, logInSuccess] = await to(
    User.findOne({
      where: {
        email: email,
      },
      // attributes: ["email", "password"],
    })
  );
  if (logInErr) return TE(logInErr.message);
  if (logInSuccess) {
  if( logInSuccess.isVerified){
    const isPasswordMatch = await bcrypt.compare(
      password,
      logInSuccess.password
    );
    if (isPasswordMatch) {
      let userInfo = {};
      console.log("Entered");
      const tokenData={
        id: logInSuccess.id,
        email: logInSuccess.email
      }
      console.log("tokenData----",tokenData);
      
      let token = getJWT(tokenData, CONFIG.jwt_encryption);
      // userInfo["user"] = logInSuccess.dataValues;
      // ...logInSuccess.dataValues, // Spread the properties of dataValues into the user object
      // logIn: {
      //   accessToken: token
      // }          // Add the accessToken key with the value of token
      // userInfo = {
      //   ...userInfo,
      //   logIn: {
      //     accessToken: token,
      //   },
      // };

      return token;
    } else {
      return TE("invalid login credentials" )
    }
  } else{
    return TE("User Not Verified please contact the Admin")
  }

  } else if(!logInSuccess&& !logInErr) {
    return TE ("User Not found" )
  }
};

const getJWT = function (user, key) {
  console.log("Called",key);
  //convert a string to integer
  let expiration_time = parseInt(CONFIG.jwt_expiration);
  //return the signature for given payload and secretkey
  return jwt.sign(user, key, { expiresIn: expiration_time });
};

const encryptDetails = (data, secretKey) => {
  if (data) {
    const text = CryptoJS.AES.encrypt(
      data.toString(),
      secretKey ? secretKey : CONFIG.secretKey
    ).toString();
    return text.replace(/\\/g, "|");
  } else {
    return null;
  }
};

const decryptDetails = (data) => {
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data.toString(), CONFIG.secretKey);
    const result = bytes.toString(CryptoJS.enc.Utf8).replace("|", /\\/g);
    // console.log('result', result);
    return result;
  } else {
    return null;
  }
};

const userVerification= async function(otp,email) {
  console.log("User Service",otp,email);
  console.log(Otp[email]== otp);
  console.log(Otp);
  if(Otp[email]== otp){
    let [error,data]= await to (User.update(
      {isVerified: true},
      {where:{email: email}}))
    if(error) return TE (error.message)
    return data
  }
  
}

const getCurrentUser = async function (user) {
  let [err, data] = await to(
    User.findOne({
      where: {
        isDeleted: false,
        email: user.email,
        id: user.id
      },
    })
  );
  // console.log(data);

  if (err) return TE(err.message);
  return data;
};

const deleteUser = async function (id) {
  console.log(id);

  let [err, data] = await to(
    User.update(
      { isDeleted: true }, // Update the isDeleted field
      { where: { id: id } }
    )
  );
  console.log(data);

  if (err) return TE(err.message);
  return data;
};

const getAllUsers= async function(){
  let[err,data]= await to(User.findAll(
    { where: { isAdmin: false } }
  ))
  if (err) return TE(err.message);
  return data;
}

const updateUser= async function(body){
  let[err,data]= await to(User.update(
    body,
    { where: { id:body.id, isDeleted: false } }
  ))
  if (err) return TE(err.message);
  return data;
}

module.exports = {
  userSignUp,
  userSignIn,
  decryptDetails,
  encryptDetails,
  getCurrentUser,
  getAllUsers,
  deleteUser,
  userVerification,
  updateUser,
  sendOtp
};
