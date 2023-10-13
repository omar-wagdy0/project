import React, { useEffect } from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout({userData ,setUserData}) {
  let navigate = useNavigate()

  function LogoutHandler(){
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')
  }
  return (
    <>
    <div className="pt-5">
      <Navbar logout={LogoutHandler} userData={userData} />
        <div className="container">
          <Outlet />
        </div>
    </div>
    </>
  );
}
