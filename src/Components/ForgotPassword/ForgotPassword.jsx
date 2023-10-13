import React from "react";
import styles from "./ForgotPassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
  let [loading , setLoading] = useState(false)
  let navigate = useNavigate()

  let formik = useFormik({
    initialValues:{
      email:''
    },
    onSubmit: SubmitHandler
  })

  async function SubmitHandler(values)
  {
    setLoading(true)
    let response = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords',values)
    console.log(response);
    setLoading(false)
    if(response.status === 200)
    {
      toast.success(response.data.message)
      navigate('/resetCode')
    }
    else{
      toast.error('Error')
    }
  }

  return (
    <>
            <Helmet><title>Forgot Password</title></Helmet>

      <h2 className="my-4">Forgot Password</h2>
      
      <form onSubmit={formik.handleSubmit}>
        <input className="form-control my-2" placeholder="Please Enter Your Email" type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} />
        {loading?<button type="button" className="btn btn-success my-4" id="btn_spin">
        <i className="fas fa-spinner fa-spin text-main text-white"></i>
          </button>
        :<button type="submit" className="btn btn-success my-4" id="btn_spin">
          Send Reset Code
        </button>}
      </form>
    
    </>
  );
}
