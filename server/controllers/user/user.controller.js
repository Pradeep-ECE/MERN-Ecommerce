const router = require("express").Router({ mergeParams: true });
const { TE, to, ReE, ReS } = require("../../global_functions");
const userService = require("../../services/user/user.service.js");
const passport = require('passport');
const registerUser = async function (req, res) {
  console.log("body",req.body);
  
  let body = req && req.body ? req.body : null;
  let [err, data] = await to(userService.userSignUp(body));
  if (err) ReE(res,{
    success: false,
    message:err.message,
    code:422
  });
  if (data) return ReS(res,{
    data: data,
    success: true,
    message:'User created successfully',
    code:200
  });
};
const signIn= async function(req,res){
    let body= req && req.body ? req.body : null;
    let[err,data]= await to(userService.userSignIn(body));
    if (err) ReE(res,err,422);
    if(data) return ReS(res,data,200)
}
const getUser=async function(req,res){
  console.log("====");
  
    // let params= req && req.params ? req.params : null;
    let[err,data]= await to(userService.getUser( ));
    if (err) ReE(res,err,422);
    if(data) return ReS(res,data,200)
}
const deleteUser =async function(req,res){
  console.log("====");
  
    let id= req && req.params && req.params.id ? req.params.id : null;
    let[err,data]= await to(userService.deleteUser(id ));
    if (err) ReE(res,err,422);
    if(data) return ReS(res,data,200)
}

const userVerification =async function(req,res){
  console.log(req.body.email);
  
    let otp= req && req.body && req.body.otp ? req.body.otp : null;
    let email=req && req.body && req.body.email ? req.body.email : null;
    console.log("BAckend controller",typeof(otp),email);
    numOtp=Number(otp.join(''));
    // console.log("BAckend controller after destruct",otp,email);
    let[err,data]= await to(userService.userVerification(numOtp,email));
    if (err) ReE(res,err,422);
    if(data) return ReS(res,{
      data: data,
      success: true,
      message:'User verified successfully',
      code:200})
}

router.post("/signUp", registerUser);
router.post("/signIn",signIn)
router.get("/getUser",getUser)
router.put("/deleteUser/:id",deleteUser)
router.post("/verify",userVerification)

module.exports = { router, registerUser,signIn,getUser,deleteUser,userVerification};
