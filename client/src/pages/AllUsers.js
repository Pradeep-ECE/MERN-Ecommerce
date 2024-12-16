// import React, { useEffect, useState } from "react";
// import { getAllUsers } from "../services/user.service";
// import { toast } from "react-toastify";
// import { MdModeEditOutline } from "react-icons/md";
// import moment from "moment";
// import ChangeUserRole from "../components/ChangeUserRole";
// import ROLE from "../services/role";
// const AllUsers = () => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const [updateUser, setUpdateUser] = useState({
//     // name: "",
//     id:"",
//     email: "",
//     role: "",
//   });
// const logUser=(data)=>{
//   console.log(data);
  
// }
// const fectchAllUsers = async () => {
//     try {
//       const allUserDetails = await getAllUsers();
//       console.log("User", allUserDetails);
//       if (allUserDetails.success) {
//         setAllUsers(allUserDetails.data);
//       }
//       if (allUserDetails.error) {
//         toast.error(allUserDetails.error);
//       }
//       console.log("allUsers", allUsers);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     fectchAllUsers();
//   }, []);
//   return (
//     <div>
//       <table className="w-full user-table">
//         <thead>
//           <tr className="bg-black text-white">
//             <th>Customer Id</th>
//             <th>Name</th>
//             <th>Role</th>
//             <th>email</th>
//             <th>is verified</th>
//             <th>createdAt</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allUsers.map((ele, index) => {
//             return (
//               <tr>
//                 <td>{index+1}</td>
//                 <td>{ele.firstName + " " + ele.lastName}</td>
//                 <td>{ele.isAdmin ? "Admin" : "User"}</td>
//                 <td>{ele?.email}</td>
//                 <td>{ele?.isVerified ? "verified" : "notVerified"}</td>
//                 <td>{moment(ele?.createdAt).format("ll")}</td>
//                 <td>
//                   <button
//                     className="bg-green-100 rounded-full curser-pointer hover:bg-green-700 hover:text-white h-full"
//                     onClick={() => {
//                       setUpdateUser(ele);
//                       setOpenUpdate(true);
//                       logUser(ele);
//                      console.log("-------------------------------------",updateUser.isAdmin)
                      
//                     }}
//                   >
//                     <MdModeEditOutline />
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       {openUpdate && (
//         <ChangeUserRole
//           onClose={() => setOpenUpdate(false)}
//           id={updateUser.id}
//           firstName={updateUser.firstName}
//           lastName={updateUser.lastName}
//           email={updateUser.email}
//           role={updateUser.isAdmin }
//           roleName ={updateUser.isAdmin ? "ADMIN" : "USER"}
//           isVerified={updateUser.isVerified}
//           onRoleUpdate={fectchAllUsers}
//         />
//       )}
//     </div>
//   );
// };

// export default AllUsers;

import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/user.service";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import moment from "moment";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    id: "",
    email: "",
    role: "",
  });
  const [checkedItems, setCheckedItems] = useState({});

  const logUser = (data) => {
    console.log(data);
  };

  const fectchAllUsers = async () => {
    try {
      const allUserDetails = await getAllUsers();
      if (allUserDetails.success) {
        setAllUsers(allUserDetails.data);
      }
      if (allUserDetails.error) {
        toast.error(allUserDetails.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fectchAllUsers();
  }, []);

  // Handle "select all" checkboxes
  const handleSelectAll = () => {
    const newCheckedItems = {};
    allUsers.forEach((_, index) => {
      newCheckedItems[index] = !Object.values(checkedItems).every(Boolean);
    });
    setCheckedItems(newCheckedItems);
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="container mx-auto my-6 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="font-bold text-xl mb-4">All Users</h2>
      <table className="min-w-full border-collapse rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-8 px-8 text-left text-sm font-semibold uppercase tracking-wider">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                onChange={handleSelectAll}
                checked={Object.values(checkedItems).every(Boolean)}
              />
            </th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Customer Id</th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Is Verified</th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Created At</th>
            <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((ele, index) => (
            <tr key={index} className="transition-transform duration-300 hover:bg-blue-100 transform hover:scale-105">
              <td className="py-8 px-8 text-left">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={checkedItems[index] || false}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td className="py-8 px-8 text-gray-700">{index + 1}</td>
              <td className="py-4 px-4 text-gray-700">{ele.firstName + " " + ele.lastName}</td>
              <td className="py-4 px-4 text-gray-700">{ele.isAdmin ? "Admin" : "User"}</td>
              <td className="py-4 px-4 text-gray-700">{ele?.email}</td>
              <td className="py-4 px-4 text-gray-700">{ele?.isVerified ? "Verified" : "Not Verified"}</td>
              <td className="py-4 px-4 text-gray-700">{moment(ele?.createdAt).format("ll")}</td>
              <td className="py-4 px-4">
                <button
                  className="bg-transparent border border-green-600 text-green-600 hover:bg-green-100 py-1 px-3 rounded transition duration-300"
                  onClick={() => {
                    setUpdateUser(ele);
                    setOpenUpdate(true);
                    logUser(ele);
                  }}
                >
                  <MdModeEditOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdate && (
        <ChangeUserRole
          onClose={() => setOpenUpdate(false)}
          id={updateUser.id}
          firstName={updateUser.firstName}
          lastName={updateUser.lastName}
          email={updateUser.email}
          role={updateUser.isAdmin}
          roleName={updateUser.isAdmin ? "ADMIN" : "USER"}
          isVerified={updateUser.isVerified}
          onRoleUpdate={fectchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;

