// import dotenv from "dotenv";

// dotenv.config();
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`;

export const uploadImage=async(image)=>{
    console.log("URLLLLLL",url);
    
    const formData= new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mern_product")
    const dataResponse= await fetch(url,{
        method:"post",
        body: formData
    })
    console.log("CLO)()()()()()()");
   
    return dataResponse.json()
}