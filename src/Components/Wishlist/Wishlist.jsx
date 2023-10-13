import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  let[isLoading , setIsLoading] = useState()

  let [Wishlist , setWishlist] = useState([])
  let {GetWishlist , RemoveFromWishlist} = useContext(cartContext)

  async function GetWishlistProducts()
  {
    setIsLoading(true)
    let response = await GetWishlist()
      console.log(response);
      setWishlist(response.data.data)
    setIsLoading(false)

  }


  async function RemoveItem(productId)
  {
    let response = await RemoveFromWishlist(productId)
    if(response.status === 200)
    {
      toast.success(response.data.message)
      setWishlist(response.data.data)
      GetWishlistProducts()
    }
    else
    {
      toast.error('Error')
    }
  }




  useEffect(()=>{
    GetWishlistProducts()
  },[])

  return (
    <>
              <Helmet><title>Wishlist</title></Helmet>
              {isLoading?<i className="fas fa-2x fa-spinner fa-spin text-main d-flex justify-content-center align-items-center my-5"></i>:


              <>
              {Wishlist?.map((product) => <div key={product._id} className="row align-items-center border-bottom py-2 my-2">
                <div className="col-md-1">
                    <Link to={`/Product-Details/${product._id}`}>
                    <img className="w-100" src={product.imageCover} alt="" />
                    </Link>
                </div>
                <div className="col-md-11 d-flex  justify-content-between">
                    <div>
                    <h6>{product.title}</h6>
                    <h6 className="text-main">Price: {product.price} EGP</h6>
                    </div>

                    <div>
                    <button onClick={()=> RemoveItem(product._id)}  className="btn text-danger w-fit-content my-3 border-white">
                    <i className="fa-solid fa-heart-circle-xmark btn fa-2x border-white"></i>
                    </button>
                    </div>
                </div>
                    
              </div>)}
              </>
              
              }


    </>
  );
}
