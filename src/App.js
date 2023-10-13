import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound/NotFound";
import Orders from "./Components/Orders/Orders"
import Wishlist from "./Components/Wishlist/Wishlist";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails"; 
import CartContextProvider from "./Context/CartContext";
import { Toaster } from 'react-hot-toast';
import Checkout from "./Components/Checkout/Checkout";
import { Offline } from "react-detect-offline";
import ResetCode from "./Components/ResetCode/ResetCode";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";




function App() {


  let [userData,setUserData] = useState()
  function saveUserData()
  {
   let encodedData = localStorage.getItem('userToken')
   let decodedData = jwtDecode(encodedData)
   setUserData(decodedData) 
  }
  
  let routes = createHashRouter([
    {
      path: "",
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute>  },
        { path: "Cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
        { path: "Product-Details/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "Categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute> <Orders/> </ProtectedRoute> },
        { path: "Wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: "Checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: "Login", element: <Login saveUserData={saveUserData} /> },
        { path: "ForgotPassword", element: <ForgotPassword/>  },
        { path: "resetCode", element: <ResetCode/>  },
        { path: "ResetPassword", element: <ResetPassword/>  },
        { path: "UpdatePassword", element: <UpdatePassword/>  },
        { path: "Register", element: <Register /> },
        // { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return <CartContextProvider>
    {/* <Offline> <div className="network">Only shown offline (surprise!)</div> </Offline> */}
    <Toaster/>
  <RouterProvider router={routes}></RouterProvider>;
  </CartContextProvider>
}

export default App;
