import React, { useContext } from "react";
import { useFormik } from "formik";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";


export default function Checkout() {

  let {OnlinePayment , cartId  } = useContext(cartContext)


  let formik = useFormik({
    initialValues:{
      details:'',
      city:'',
      phone:''
    },
    onSubmit: submitHandler
  })

  async function submitHandler(values)
  {
    let response = await OnlinePayment(cartId, values)
    if(response?.data?.status === 'success')
    {
      window.location.href = response.data.session.url
    }


    // window.location.href = response.data
  }

  return (
    <>
              <Helmet><title>Checkout</title></Helmet>

      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto w-50 py-5">
          <label htmlFor="details">Name :</label>
          <input className="form-control mb-3" type="text" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} />

          <label htmlFor="city">Address :</label>
          <input className="form-control mb-3" type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} />

          <label htmlFor="details">Phone :</label>
          <input className="form-control mb-3" type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} />


          <button className="btn bg-main text-white w-100 .cursor-pointer">Pay</button>
        </div>
      </form>
    </>
  );
}
