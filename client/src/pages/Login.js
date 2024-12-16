import React, { useContext, useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { userSignIn } from "../services/user.service.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../context/index.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const[data,setData]=useState({email:'',password:''})
  const navigate=useNavigate()
  const {fetchUserDetails,fetchCartProducts}=useContext(Context)
  console.log("commonContext",fetchUserDetails);
  
  const handleOnChange =(e)=>{
    const {name,value}=e.target;
    setData((prev)=>
      {
        return{
          ...prev,
          [name]: value
        }
      }) 
    }
    const setAuthHeader = (token) => {
      // Store the token in localStorage or sessionStorage
      localStorage.setItem("token", token);
  
      // Set default Authorization header for all Axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
   const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log("Login data------",data);
    try{
      const login= await userSignIn(data)
      if (login.data.success) {
        // console.log("Manigaaj",login.data.data.userInfo.logIn.accessToken);
        console.log("ManiGaaj",login.data);
        
        const token=login.data.data
        // axios.defaults.headers.common["Authorization"] = token;
        setAuthHeader(token);
        toast.success(login.data.message);
        fetchUserDetails();
        fetchCartProducts();
        navigate('/')
      } else {
        toast.error(login.data.error);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
   }
  
  return (
    <section id="login">
      <div className="mx-auto container p-4">
      <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="logIn icon" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label> Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  placeholder="enter email"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  value={data.email}
                />
              </div>
            </div>
            <label> Password :</label>
            <div className="bg-slate-100 p-2 flex">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter password"
                name="password"
                className="w-full h-full outline-none bg-transparent"
                onChange={handleOnChange}
                value={data.password}
              />
              <div
                className="cursor-pointer text-xl"
                onClick={() => setShowPassword((preve) => !preve)}
              >
                <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
             
            </div>
            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
            Forgot password ?
        </Link>
            <button className="bg-red-600 text-white w-full mt-6 px-6 py-3 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block">LogIN</button>
          </form>
          <p className="my-5">Don't have account? <Link to={'/sign-up'} className= "text-red-600 hover:text-red-700 hover:underline">Sign up</Link> </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
