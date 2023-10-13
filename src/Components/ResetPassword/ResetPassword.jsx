import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";


export default function ResetPassword() {
  let [loading , setLoading] = useState(false)
  let navigate = useNavigate()

  let formik = useFormik({
    initialValues:{
      email:'',
      newPassword:''
    },
    onSubmit: SubmitHandler
  })

  async function SubmitHandler(values)
  {
    setLoading(true)
    let response = await axios.put('https://route-ecommerce.onrender.com/api/v1/auth/resetPassword',values).then((res)=>res).catch((Err)=>Err)
    console.log(response);
    setLoading(false)
    if(response.status === 200)
    {
      toast.success('Password Changed Successfully')
      localStorage.setItem('userToken' , response.data.token ) 
      navigate('/')
    }
    else{
      toast.error('Error')
    }
  }

  return (
    <>
        <Helmet><title>Reset Password</title></Helmet>

            <h2 className="my-4">Reset Password</h2>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input className="form-control my-2" type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} />

        <label htmlFor="newPassword">New Password</label>
        <input className="form-control my-2" type="password" name="newPassword" id="newPassword" onChange={formik.handleChange} value={formik.values.newPassword} />



        {loading?<button type="button" className="btn btn-success my-4" id="btn_spin">
        <i className="fas fa-spinner fa-spin text-main text-white"></i>
          </button>
        :<button type="submit" className="btn btn-success my-4" id="btn_spin">
          Change Password
        </button>}
      </form>
    
    </>
  );
}
