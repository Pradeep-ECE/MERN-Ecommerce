const router = require("express").Router({ mergeParams: true });
// const { TE, to, ReE, ReS } = require("../../global_functions.js");
const { TE, to, ReE, ReS } = require("../../global_functions.js");
const userService = require("../../services/user/user.service.js");
const passport = require("passport");
const authToken = require("../../middleware/authToken.js");
const registerUser = async function (req, res) {
  let body = req && req.body ? req.body : null;
  let [err, data] = await to(userService.userSignUp(body));
  if (err)
    ReE(res, {
      success: false,
      message: err.message,
      code: 422,
    });
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "User created successfully",
      code: 200,
    });
};
const signIn = async function (req, res) {
  let body = req && req.body ? req.body : null;
  let [err, data] = await to(userService.userSignIn(body));
  if (err)
    ReE(res, {
      success: false,
      message: err.message,
      code: 422,
    });
  if (data) {
    res.setHeader("Authorization", data);
    res.cookie("token", data, {
      httpOnly: true, // Cookie can't be accessed via client-side JavaScript
      secure: true, // Cookie is only sent over HTTPS});
    });
    return ReS(res, {
      data: data,
      success: true,
      message: "User LogIN successfully",
      code: 200,
    });
  }
};
const getCurrentUser = async function (req, res) {
  let user = req?.user ? req.user : null;
  let [err, data] = await to(userService.getCurrentUser(user));
  if (err)
    ReE(res, {
      success: false,
      message: err.message,
      code: 422,
    });
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "User fetched successfully",
      code: 200,
    });
};
const deleteUser = async function (req, res) {
  let id = req && req.params && req.params.id ? req.params.id : null;
  let [err, data] = await to(userService.deleteUser(id));
  if (err) ReE(res, err, 422);
  if (data) return ReS(res, data, 200);
};

const userVerification = async function (req, res) {
  let otp = req && req.body && req.body.otp ? req.body.otp : null;
  let email = req && req.body && req.body.email ? req.body.email : null;
  numOtp = Number(otp.join(""));
  let [err, data] = await to(userService.userVerification(numOtp, email));
  if (err) ReE(res, err, 422);
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "User verified successfully",
      code: 200,
    });
};

const logOut = async function (req, res) {
  try {
    res.clearCookie("token");
    return ReS(res, {
      data: [],
      message: "Logged out successfully",
      success: true,
      code: 200,
    });
  } catch (error) {
    return ReE(res, {
      message: error.message,
      success: false,
      code: 422,
    });
  }
};

const getAllUsers = async function (req, res) {
  console.log(req);
  
  let [err, data] = await to(userService.getAllUsers());
  if (err)
    ReE(res, {
      success: false,
      message: err.message,
      code: 422,
    });
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "User fetched successfully",
      code: 200,
    });
};

const updateUser = async function (req, res) {
 
  let body= req?.body ? req.body : null;
  
  let [err, data] = await to(userService.updateUser(body));
  if (err)
    ReE(res, {
      success: false,
      message: err.message,
      code: 422,
    });
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "User updated successfully",
      code: 200,
    });
};
const sendOtp = async function (req, res) {
  console.log("ENTERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
  
 
  let email= req?.body?.email ? req.body.email : null;
  console.log("email",email);
  
  
  let [err, data] = await to(userService.sendOtp(email));
  if (err)
    ReE(res, {
      success: false,
      message: err.message,
      code: 422,
    });
  if (data)
    return ReS(res, {
      data: data,
      success: true,
      message: "Otp Send successfully",
      code: 200,
    });
};


router.post("/signUp", registerUser);
router.post("/signIn", signIn);
router.get("/getUser", authToken, getCurrentUser);
router.put("/deleteUser/:id", deleteUser);
router.put("/updateUser",authToken,updateUser)
router.post("/verify", userVerification);
router.get("/getAllUsers",authToken,getAllUsers);
router.post("/logOut", logOut);
router.post("/verify/sendotp",sendOtp)

module.exports = {
  router,
  registerUser,
  signIn,
  getCurrentUser,
  deleteUser,
  userVerification,
  logOut,
  updateUser,sendOtp
};
