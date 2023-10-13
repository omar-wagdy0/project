import axios from 'axios'
import React, { createContext, useState } from 'react'

export let cartContext = createContext()



export default function CartContextProvider(props) {
  let [cartId , setCartId] = useState(null)
  let [cartOwner , setcartOwner] = useState(null)


  let [numOFItems , setnumOFItems] = useState(0)

    let headers = {
        token : localStorage.getItem('userToken')
    } 

    function AddToCart(productId)
    {
      return  axios.post('https://route-ecommerce.onrender.com/api/v1/cart',
      {
        productId:productId
      },
      {
        headers:headers
      }).then((res)=>res)
      .catch((err)=>err)
    }


    function AddToWishlist (productId)
    {
      return axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist',
      {
        productId: productId
      }
      ,
      {
        headers:headers
      }).then((res)=> res)
      .catch((err)=>err)
    }


    function GetCart()
    {
      return  axios.get('https://route-ecommerce.onrender.com/api/v1/cart',
      {
        headers:headers
      }).then((res)=>res)
      .catch((err)=>err)
    }



    function GetWishlist()
    {
      return  axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist',
      {
        headers:headers
      }).then((res)=>res)
      .catch((err)=>err)
    }



    function RemoveFromWishlist(productId)
    {
      return   axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`,
      {
        headers:headers
      }).then((res)=>res)
      .catch((err)=>err)
    }



    function RemoveItem(productId)
    {
      return   axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
      {
        headers:headers
      }).then((res)=>res)
      .catch((err)=>err)
    }

    function UpdateQuantity(productId,count)
    {
      return   axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
      {
        count: count
      },
      {
        headers:headers
      }).then((res)=>res)
      .catch((err)=>err)
    }



    function OnlinePayment(cartId, shippingAddress) {
    
      return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=https://ahmedelmessery.github.io/fresh-cart`,
          {
            shippingAddress: shippingAddress,
          },
          {
            headers: headers,
          }
        )
        .then((res) => res)
        .catch((err) => err);
    }
    


    function Clear()
    {
      return  axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`,
      {
        headers:headers
      }).then((res)=>res)
      .catch((err)=>err)
    }


    function GetOrders(cartOwner)
    {
      console.log(cartOwner);
      return axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${cartOwner}`,
      {
        headers:headers
      }
      )
    }



  return <cartContext.Provider value={{AddToCart  ,AddToWishlist , GetWishlist , GetCart ,RemoveItem , RemoveFromWishlist , Clear , GetOrders , UpdateQuantity , OnlinePayment , numOFItems ,setnumOFItems ,cartId , setCartId , cartOwner , setcartOwner}}>
    {props.children}
  </cartContext.Provider>
}
