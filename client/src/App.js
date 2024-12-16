import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { getCartProduct, getCurrentUser } from './services/user.service';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispacth=useDispatch()
  const[cartProductCount,setCartProductCount]=useState(0)
  const fetchUserDetails=async ()=>{
    const currentUser= await getCurrentUser();
    console.log(currentUser);
    if(currentUser.success){
    dispacth(setUserDetails(currentUser.data))
    }
  }
  const fetchCartProducts=async()=>{
    console.log("GETCARTCALLED=============>>>>>>>>>");
    
    const response= await getCartProduct();
    console.log("CARTPRODUCT==============>",response);
    setCartProductCount(response?.data?.count)
  }

  
  useEffect(()=>{
    fetchUserDetails();
    fetchCartProducts();

  },[])
  return (
  <>
  <Context.Provider value={{
    fetchUserDetails,
    cartProductCount,
    fetchCartProducts
  }}>
  <ToastContainer />
    <Header />
    <main className='min-h-[calc(100vh-120px)] pt-16'>
    <Outlet />
    </main>
    <Footer />
    </Context.Provider>
  </>
  );
}

export default App;
