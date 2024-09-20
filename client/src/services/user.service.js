import { getMethod,postMethod,putMethod,deleteMethod } from "./common.service";

export const userSignUp= async(data)=>{
    console.log("userSignupd");
    
    const signupRsponse = await postMethod(
        `user/signUp`,{
        headers:{
            "content-type": "application/json"
        }
    },
    data
    )
return signupRsponse;
}

export const userVerification= async(data)=>{
    console.log("verify Entered",data);
    
    const userVerification = await postMethod(
        `user/verify`,{
        headers:{
            "content-type": "application/json"
        }
    },
    data
    )
return userVerification
}