import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";


export default function Cart() {
  let[isLoading , setIsLoading] = useState()

  let [cart , setCart] = useState(null)

  let {GetCart , Clear ,RemoveItem , UpdateQuantity , setCartId , setcartOwner , cartOwner} = useContext(cartContext);

  async function getProducts()
  {
    setIsLoading(true)

    let response = await GetCart();
    console.log(response);

    setCartId(response.data.data._id)
    setcartOwner(response.data.data.cartOwner)
    console.log(cartOwner);
    if(response?.data?.numOfCartItems > 0)
    {
    setCart(response.data.data);
    }
    
    setIsLoading(false)

  }



  async function Remove(productId)
  {
    let response = await RemoveItem(productId)
    setCart(response.data.data);
    toast.success('Product Successfully Removed')

  }


  async function ClearAll()
  {
    let response = await Clear()
    toast.success('Cart Successfully Cleared')

    setCart(response.data.data);

  }



  async function ProductQuantity(productId , count)
  {
    let response = await UpdateQuantity(productId , count)
    setCart(response.data.data);

  }




  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  


  return (
    
    <>
    
          <Helmet><title>Cart</title></Helmet>
          {isLoading?<i className="fas fa-2x fa-spinner fa-spin text-main d-flex justify-content-center align-items-center my-5"></i>:
          
<>
    {cart !== null ? <div  className="bg-main-light p-4 my-4">
        <h3>Shop Cart :</h3>
        {cart.products.map((product)=> <div key={product.product._id} className="row align-items-center border-bottom py-2 my-2">
        <div className="col-md-1">
          <img className="w-100" src={product.product.imageCover} alt="" srcSet="" />
        </div>
        <div className="col-md-11 d-flex justify-content-between">
          <div>
          <h6>{product.product.title}</h6>
          <h6 className="text-main">Price: {product.price} EGP</h6>


          <button onClick={()=>Remove(product.product._id)} className="btn m-0 p-0 "><i className="fa-regular fa-trash-can text-danger"></i> Remove</button>

          </div>


          <div>
            <button onClick={()=> ProductQuantity(product.product._id , product.count+1 )} className="btn border-main btn-sm">+</button>
            <span className="mx-2">{product.count}</span>
            <button onClick={()=> ProductQuantity(product.product._id , product.count-1 )} className="btn border-main btn-sm">-</button>
          </div>
        </div>
      </div>)
      }
      <h6 className="text-main fw-bold">Total Cart Price : {cart.totalCartPrice} EGP</h6>

    <div className="d-flex justify-content-between align-items-center">

    <button className="btn bg-main my-2">
        <Link to={'/Checkout'} className="text-white">
          Checkout
        </Link>
      </button>

      {/* <button onClick={ClearAll} className="btn bg-danger my-2 text-white">
          Clear Cart
      </button> */}

    </div>


      </div>: <div>
        <h3 className="d-flex justify-content-center my-5">Cart is Empty ...</h3>
        </div>}
        </>

          }

    </>

  );
}
