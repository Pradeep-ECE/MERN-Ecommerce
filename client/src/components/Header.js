import React, { useContext, useState } from "react";
import { Logo } from "./Logo";
import { FcSearch } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
// import userPic from "../assest/user.png";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLogOut } from "../services/user.service";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";
import { product_Search } from "../services/product.service";

export const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context=useContext(Context)
  const navigate=useNavigate()
  const [menuDisplay,setMenuDisplay]=useState(false)
  const {product}=useParams()
  const[search,setSearch]=useState('')
  const handleLogOut = async () => {


    const logOut = await UserLogOut();

    console.log(logOut);
    if (logOut.data.success) {
      dispatch(setUserDetails(null));
      toast.success(logOut.data.message);
      navigate('/')
    }
    if (logOut.data.error) {
      toast.error(logOut.data.message);
    }
  };
  console.log("Cart Count",context);
  const handleSerach=(e)=>{

    const {value}=e.target;

    console.log("VALUEEEEE",value);
    
    
    if(value){
      setSearch(value)
      navigate(`/search/${value.trim()}`)
    }
  }
  
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full flex items-center container mx-auto px-4 justify-between">
        <div className="cursor-pointer">
          <Link to={"/"}>
            <Logo width={90} height={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder=" search product Here"
            className="w-full outline-none"
            onChange={handleSerach}
            value={search}
          />
          <div className="text-lg min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full ">
            <FcSearch className="cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="relative group flex justify-center">
            <div className="text-3xl cursor-pointer" onClick={()=> setMenuDisplay(prev => !prev)}>
            {user?.profilePic ? (<img
              src={user.profilePic}
              alt="empty"
              className="h-9 w-9 rounded-full"
            />): <FaUserCircle/>}
            </div>
            {
              menuDisplay &&(
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                {
                    user?.isAdmin && <Link to={"admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover-bg-slate-100 p-2' onClick={()=> setMenuDisplay(prev => !prev)}>Admin panel</Link>
                }
                </nav>
                </div>
              )
            }
           
          </div>
          {
            user &&
            <Link to={"/cart"} className="text-2xl relative cursor-pointer">
            <span>
              <FaShoppingCart className="h-7 w-7" />
            </span>

            <div className="bg-red-600 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-2">
              <p className="text-sm">{context?.cartProductCount}</p>
            </div>
          </Link>
            
          }

          <div>
            {user ? (
              <button
                onClick={handleLogOut}
                className="px-2 bg-red-600 rounded-full py-1 text-white hover:bg-red-700"
              >
                Log Out
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-2 bg-red-600 rounded-full py-1 text-white hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
