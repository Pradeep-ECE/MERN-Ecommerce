import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImage=[image1Mobile,image2Mobile,image3Mobile,image4Mobile,image5Mobile]

 

  const nextImage = () => {
    setCurrentImage((prev) => {
      const nextIndex = prev < desktopImages.length - 1 ? prev + 1 : 0;
      return nextIndex;
    });
  };

  const previousImage = () => {
    setCurrentImage((prev) => {
      const prevIndex = prev > 0 ? prev - 1 : desktopImages.length - 1;
      return prevIndex;
    });
  };


    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },3000)

        return ()=> clearInterval(interval)
    },[currentImage])


  return (
    <div className="container mx-auto px-4 rounded">
      <div className=" h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button className="bg-white shadow-md rounded-full p-1" onClick={previousImage}>
              <FaAngleLeft />
            </button>
            <button className="bg-white shadow-md rounded-full p-1" onClick={nextImage}>
              <FaAngleRight />
            </button>
          </div>
        </div>
            {/**  Desktop*/}
           {/**desktop and tablet version */}
           <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                        desktopImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all duration-300' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} alt="banner" className='w-full h-full'/>
                            </div>
                            )
                        })
                }
              </div>


                {/**mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                        mobileImage.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all duration-300' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} alt="Banner" className='w-full h-full object-cover'/>
                            </div>
                            )
                        })
                }
              </div>
      </div>
    </div>
  );
};

export default BannerProduct;
