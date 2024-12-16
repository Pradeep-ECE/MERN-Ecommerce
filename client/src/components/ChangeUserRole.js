import React, { useState } from "react";
import ROLE from "../services/role.js";
import { IoCloseSharp } from "react-icons/io5";
import { sendVerificationOtp, updateUser } from "../services/user.service.js";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";

const ChangeUserRole = ({
  id,
  firstName,
  lastName,
  email,
  role,
  onClose,
  roleName,
  isVerified,
  onRoleUpdate
}) => {
  //   const [userRole, setUserRole] = useState(role);
  const [updatedUserData, setUpdatedUserData] = useState({
    id: id,
    email: email,
  });
  const navigate = useNavigate();

  //   const handleOnChangeRole = (e) => {
  //     setUserRole(e.target.value);
  //     console.log("Changed Role:", e.target.value);
  //   };
  const handleUserVerify = async (e) => {
    try{
    const sendUserVerificationOtp = await sendVerificationOtp({
      email: updatedUserData.email,
    });

    console.log("sendUserVerificationOtp", sendUserVerificationOtp);

    if (sendUserVerificationOtp.status === 200) {
      toast.success("Otp Send Successfully");
      console.log(
        "updatedUserData.emailupdatedUserData.emailupdatedUserData.email",
        updatedUserData.email
      );

      navigate("/otp", { state: { userEmail: updatedUserData.email } });
    }
    if (sendUserVerificationOtp.error) {
      toast.success(sendUserVerificationOtp.message);
    }
  } catch(err){
    console.log(err.message);
  }
    // return sendUserVerificationOtp
  };
  const handleSetUpdatedUserData = (e) => {
    setUpdatedUserData({
      ...updatedUserData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSetUpdatedUserRole = (e) => {
    console.log("USERVERIFY????????", isVerified);

    console.log(" e.target.value", e.target.value, role);

    setUpdatedUserData({
      ...updatedUserData,
      [e.target.id]: e.target.value,
    });
    console.log("setUpdatedUserData", updatedUserData);
  };

  const handleValue = async () => {
    console.log("updatedUserData", updatedUserData);
    const updateUserData = await updateUser(updatedUserData);
    if (updateUserData.success) {
      toast.success(updateUserData.message);
      onClose();
      onRoleUpdate();
      navigate("/admin-panel/all-users");
    }
    if (updateUserData.error) {
      toast.error(updateUserData.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button
          className="block ml-auto text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <IoCloseSharp className="text-xl" />
        </button>

        <h1 className="pb-4 text-lg font-medium text-center">
          Change User Role
        </h1>

        {/* Form */}
        <form>
          {/* First Name */}
          <label htmlFor="firstName" className="block mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={updatedUserData.firstName || firstName}
            onChange={handleSetUpdatedUserData}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none"
          />

          {/* Last Name */}
          <label htmlFor="lastName" className="block mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={updatedUserData.lastName || lastName}
            onChange={handleSetUpdatedUserData}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none"
          />

          {/* Email */}
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={updatedUserData.email || email}
            onChange={handleSetUpdatedUserData}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </form>

        {/* Role Selection */}
        <div className="flex items-center justify-between my-4">
          <p>Role:</p>
          <select
            id="isAdmin"
            className="border px-4 py-1 rounded-md"
            // value={updatedUserData.isAdmin ? "ADMIN":"USER" || role}
            onChange={handleSetUpdatedUserRole}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option
                  value={el === "ADMIN" ? true : false}
                  key={el}
                  selected={roleName === el}
                >
                  {el}
                </option>
              );
            })}
          </select>
          {!isVerified && (
            <p
              className="block w-fit ml-auto hover:underline hover:text-blue-600 cursor-pointer"
              onClick={handleUserVerify}
            >
              Verify User
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleValue}
          className="w-full py-2 px-3 mt-4 rounded-full bg-red-500 text-white hover:bg-red-700 transition"
          Link
          to={"/all-users"}
        >
          Update Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
