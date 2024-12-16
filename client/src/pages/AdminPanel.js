import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import userPic from "../assest/user.png";
import { FaUserCircle } from "react-icons/fa";
import { Link,Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate= useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user]);
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full  w-full  max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col ">
          <div className="text-5xl cursor-pointer">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="empty"
                className="h-20 w-20 rounded-full"
              />
            ) : (
              <FaUserCircle />
            )}
          </div>
          <p className="capitalized-text-lg font-semibold">
            {user && user?.firstName && user?.lastName
              ? user.firstName + " " + user.lastName
              : "guestUser"}
          </p>
          <p className="text-sm">{user?.isAdmin ? "Admin" : "Customer"} </p>
        </div>
        <div>
        {/**navigation */}
        <div>
            <nav className="grid p-4">
              <Link to={"all-products"}className="px-2 py-1 hover:bg-slate-100">Product</Link>
              <Link to={"all-users"}className="px-2 py-1 hover:bg-slate-100">All users</Link>
            </nav>
        </div>
        </div>
      </aside>
      <main className='w-full h-full p-2'>
      <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
