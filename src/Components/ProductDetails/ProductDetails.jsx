import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";


export default function ProductDetails() {
  let[isLoading , setIsLoading] = useState()
  let [ProductDetails , setProductDetails] = useState([])
  let {id} = useParams()

  let {AddToCart , setnumOFItems ,AddToWishlist} = useContext(cartContext)

  async function AddProduct(productId)
  {
    
    let response = await AddToCart(productId)
    console.log(response);
    if(response?.data?.status === 'success')
    {
      toast.success(response.data.message,{className:'text-center'})
      setnumOFItems(response.data.numOfCartItems)
    }
    else
    {
      toast.error('error')
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  async function Wishlist(productId)
  {
    let response = await AddToWishlist(productId)
    console.log(response);
    if(response?.data?.status === 'success')
    {
      toast.success(response.data.message,{className:'text-center'})
    }
    else
    {
      toast.error('error')
    }
  }
  
  async function getProductDetails()
  {
    setIsLoading(true)
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setProductDetails(data.data)
    setIsLoading(false)
  } 

  useEffect(()=>{
    getProductDetails()
  },[])
  return (
    <>
    <div className="container">
      <div className="row d-flex align-items-center">
        {isLoading?<i className="fas fa-2x fa-spinner fa-spin text-main d-flex justify-content-center align-items-center my-5"></i>:        
        <>
              <div className="col-md-4">
                          <Slider {...settings}>
                              {ProductDetails.images?.map((image)=> <img key={ProductDetails._id} className="w-100" src={image} alt=""/>)}
                          </Slider>
              </div>
            <div className="col-md-8">
                    <h3 className="fw-bold py-2">{ProductDetails.title}</h3>
                    <h1 className="h6 text-muted py-2">{ProductDetails.description}</h1>

                    <div className="d-flex justify-content-between">
                            <span className="h6 fw-bold">{ProductDetails.price} EGP</span>
                            <span>
                              <i className="fas fa-star rating-color"></i>
                              {ProductDetails.ratingsAverage}
                            </span>
                    </div>
                    
                <button onClick={()=> AddProduct(ProductDetails._id)} className="btn bg-main text-white w-100 py-2">Add To Cart</button>


                <button onClick={()=> Wishlist(ProductDetails._id)}  className="btn text-success w-fit-content my-3 border-white">
                <i className="fa-solid fa-heart-circle-plus btn fa-2x border-white"></i>
                </button>
              </div> 
              </>}



          </div>
        </div> 

    </>
  );
}
