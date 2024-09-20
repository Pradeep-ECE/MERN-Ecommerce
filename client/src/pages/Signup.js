import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase54";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import  {userSignUp}  from "../services/user.service.js";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpVerify,setOtpVerify]=useState(false)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    profilePic: loginIcon,
    confirmPassword: "",
  });
  const navigate=useNavigate()
  // const[profilePic,setProfilePic]=useState(loginIcon)

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  const handleOtpVerify=(e)=>{
    // setOtpVerify((prev)=> !prev)
    setOtpVerify(true)

  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entered");

    if (data.password === data.confirmPassword) {
      try {
        const userData = await userSignUp(data);
        if (userData.data.success) {
          let email= userData.data.data.createData.email
          localStorage.setItem('email', email);
          toast.success(userData.data.message);
          navigate('/otp')
        } else {
          toast.error(userData.data.error);
        }
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      }
    } else {
      toast.error("Password and confirm password didn't match");
    }
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic} alt="logIn icon" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>First Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  required
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  value={data.firstName}
                />
              </div>
              <label>Last Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Enter Last Name"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  value={data.lastName}
                />
              </div>
              <label>Date Of Birth</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="date"
                  name="dob"
                  placeholder="Enter Last Name"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  value={data.dob}
                />
              </div>
              <label> Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  required
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
                required
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
            <label>Confirm Password :</label>
            <div className="bg-slate-100 p-2 flex">
              <input
                type="password"
                placeholder="enter password"
                name="confirmPassword"
                required
                className="w-full h-full outline-none bg-transparent"
                onChange={handleOnChange}
              />
            </div>
            <button className="bg-red-600 text-white w-full mt-6 px-6 py-3 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block">
              Sign Up
            </button>
          </form>
          <p className="my-5">
            Already have an account ?
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
