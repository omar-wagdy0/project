import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function FeaturedProducts() {
  let [featuredProducts , setFeaturedProducts] = useState([])
  let[isLoading , setIsLoading] = useState()

  
  let {AddToCart , setnumOFItems} = useContext(cartContext)

  async function AddProduct(productId)
  {
    
    let response = await AddToCart(productId)
    if(response?.data?.status === 'success')
    {
      setnumOFItems(response.data.numOfCartItems)
      toast.success(response.data.message,{className:'text-center'})
    }
    else
    {
      toast.error('error')
    }
  }

  async function GetProducts()
  {
    setIsLoading(true)
    let {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
    setFeaturedProducts(data.data)
    setIsLoading(false)

  }
  
      useEffect(()=>{
        GetProducts()
      },[])

  return <>

<Helmet><title>Fresh Cart | Home</title></Helmet>

   {isLoading?<i className="fas fa-2x fa-spinner fa-spin text-main d-flex justify-content-center align-items-center my-5"></i>:
      <div className="row">
        {featuredProducts.map((product)=> 
          <div key={product._id} className="col-md-2">  
            <div className="product cursor-pointer px-2 py-3">
              <Link to={`Product-Details/`+product.id}>
              <img className="w-100" src={product.imageCover} alt="" srcSet="" />
              <span className="text-main fw-bold font-sm">{product.category.name}</span>
              <h3 className="h6 fw-bolder">{product.title.split(' ').slice(0,2).join(' ')}</h3>
                <div className="d-flex justify-content-between">
                    <span className="h6 text-muted">{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </span>
                </div>
                </Link>
                <button onClick={()=> AddProduct(product._id)} className="btn bg-main text-white w-100">Add To Cart</button>

            </div>
          </div>
        )}
      </div>
}
    </>
}
