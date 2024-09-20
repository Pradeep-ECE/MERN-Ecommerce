const imageToBase64= async (image)=>{
    console.log("IMG TO 64");
    
    const reader=new FileReader()
    reader.readAsDataURL(image);

    const data=await new Promise((resolve,reject)=>{
        reader.onload=()=> resolve(reader.result)

        reader.onerror= error => reject(error)
    })
    return data;
}

export default imageToBase64;