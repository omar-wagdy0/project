import  { React, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.svg'
import { cartContext } from "../../Context/CartContext";


export default function Navbar({logout}) {
let {numOFItems , setnumOFItems , setCartId} = useContext(cartContext)

  let userData = localStorage.getItem('userToken')

  let {GetCart} = useContext(cartContext)
  async function getLoggedCart()
  {
    let response = await GetCart();
    if(response?.data?.numOfCartItems)
    {
      setnumOFItems(response.data.numOfCartItems)
      setCartId(response.data.data._id)
    }
     else
     {
      return null;
     }
  }

  useEffect(()=>{
    getLoggedCart()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" href="#">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData !== null ?           <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"cart"}>
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"allorders"}>
                  Orders
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="Categories">
                  Categories
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="Wishlist">
                Wishlist
                </Link>
              </li>
            </ul>
          :null}
        

        
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {/* <li className="nav-item d-flex align-items-center">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-tiktok"></i>
                <i className="fab mx-2 fa-linkedin"></i>
                <i className="fab mx-2 fa-youtube"></i>
              </li> */}

              {userData === null ?               <>
              <li className="nav-item">
                <Link className="nav-link" to="Login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="Register">
                  Resgister
                </Link>
              </li>
              </> : <>

              <li className="nav-item position-relative">
                <Link className="nav-link px-2" to={'/cart'}>
                 <i className="fas fa-shopping-cart fa-xl"></i>
                 <span className="badge bg-main text-white position-absolute top-0 end-0">{numOFItems}</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={logout}>
                  Sign Out
                </Link>
              </li>
              
              </>
              }


            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
