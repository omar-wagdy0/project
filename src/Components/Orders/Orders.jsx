import React, { useContext, useEffect, useState } from "react";
import styles from "./Orders.module.css";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Orders() {
    
  let [getOrders , setGetOrders] = useState([])
  let {GetOrders , cartOwner} = useContext(cartContext)

  async function Orders()
  {
    let response = await GetOrders(cartOwner)
    console.log(response);
    setGetOrders(response.data)
  }

  useEffect(()=> {
    Orders()
  },[])
  
  return (
    <>
     <Helmet><title>Orders</title></Helmet>
      <h2 className="my-4">Orders</h2>
    
    {getOrders.map((order) => <div key={order._id} className=" bg-light p-3 my-2 d-flex justify-content-between align-items-center">
      <div className="col-6 text-center">  
    <h6 className="fw-bold">Order Id : <span className="text-warning">{order.id} </span> </h6>
    <h6 className="fw-bold">Name : <span className="text-main"> {order.shippingAddress.details} </span></h6>
    <h6 className="fw-bold">Address :  <span className="text-main"> {order.shippingAddress.city} </span></h6>
    <h6 className="fw-bold">Phone :  <span className="text-main"> {order.shippingAddress.phone} </span></h6>
    <h6 className="fw-bold">Total Cost :  <span className="text-danger"> {order.totalOrderPrice} EGP</span> </h6>
    </div>

    <div className="details col-6">
    {order.cartItems.map((orderr)=> <div key={orderr._id}>
       <h6 className="fw-bold">Name : <span className="text-secondary"> {orderr.product.title} </span></h6>
       <h6 className="fw-bold border-bottom py-2">Price :  <span className="text-info"> {orderr.price} EGP  </span></h6>
      </div>)}
    </div>

    </div>)}

    </>
  );
}
