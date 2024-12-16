import {
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
} from "./common.service";

const token = localStorage.getItem("token");

export const userSignUp = async (data) => {
  const signupRsponse = await postMethod(
    `user/signUp`,
    {
      headers: {
        "content-type": "application/json",
      },
    },
    data
  );
  return signupRsponse;
};

export const userVerification = async (data) => {
  const userVerification = await postMethod(
    `user/verify`,
    {
      headers: {
        "content-type": "application/json",
      },
    },
    data
  );
  return userVerification;
};

export const userSignIn = async (data) => {
  const userSignIn = await postMethod(
    `user/signIn`,
    {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    },
    data
  );
  return userSignIn;
};

export const getCurrentUser = async (data) => {
  const currentUser = await getMethod(
    `user/getUser`,
    {
      headers: {
        "content-type": "application/json",
        authorization: token ? token : null,
      },
      withCredentials: true,
    },
    data
  );
  return currentUser;
};

export const UserLogOut = async () => {
  const userLogOut = await postMethod(`user/logOut`, {
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    withCredentials: true,
  });
  return userLogOut;
};

export const getAllUsers = async () => {
  const fectchAllUsers = await getMethod(`user/getAllUsers`, {
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    withCredentials: true,
  });
  return fectchAllUsers;
};

export const updateUser = async (data) => {
  console.log("DATAIUPDATED", data);

  const updateUser = await putMethod(
    `user/updateUser`,
    {
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
      withCredentials: true,
    },
    data
  );
  return updateUser;
};

export const sendVerificationOtp = async (data) => {
  console.log("OTTTTTPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", data);

  const sendOtp = await postMethod(
    `user/verify/sendotp`,
    {
      headers: {
        "content-type": "application/json",
        authorization: token,
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    },
    data
  );
  return sendOtp;
};

export const addToCart = async (data) => {
  console.log("OTTTTTPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", data);

  const addToCart = await postMethod(
    `cart/cartProduct`,
    {
      headers: {
        "content-type": "application/json",
         authorization: token,
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    },
    data
  );
  return addToCart;
};

export const getCartProduct = async (data) => {
  console.log("OTTTTTPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", data);

  const getCartProduct = await getMethod(
    `cart/cartProduct`,
    {
      headers: {
        "content-type": "application/json",
         authorization: token,
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    },
    data
  );
  return getCartProduct;
};

export const deleteCartProduct = async (id) => {
  console.log("OTTTTTPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", id);

  const deleteCart = await putMethod(
    `cart/cartProduct/${id}`,
    {
      headers: {
        "content-type": "application/json",
         authorization: token,
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    },
    
  );
  return deleteCart;
};

export const updateCartProduct = async (data) => {
  console.log("OTTTTTPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", data);

  const updateCart = await putMethod(
    `cart/cartProduct`,
    {
      headers: {
        "content-type": "application/json",
         authorization: token,
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    },
    data
    
  );
  return updateCart;
};