import React from "react";
import styles from "./UpdatePassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function UpdatePassword() {
  
  let headers = {
    token : localStorage.getItem('userToken')
  } 

  let [loading , setLoading] = useState(false)
  let navigate = useNavigate()

  let formik = useFormik({
    initialValues:{
      currentPassword:'',
      password:'',
      rePassword:''
    },
    onSubmit: SubmitHandler
  })

  async function SubmitHandler(values)
  {
    setLoading(true)
    let response = await axios.put('https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword',values,
    {
      headers:headers
    })
    console.log(response);
    setLoading(false)
    // if(response.status === 200)
    // {
    //   toast.success(response.data.message)
    //   navigate('')
    // }
    // else{
    //   toast.error('Wrong Password')
    // }
  }

  return (
    <>

    <Helmet><title>Update Password</title></Helmet>
            <h2 className="my-4">Update Password</h2>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="currentPassword">Current Password</label>
        <input className="form-control my-2"  type="password" name="currentPassword" id="currentPassword" onChange={formik.handleChange} value={formik.values.currentPassword} />

        
        <label htmlFor="password">Password</label>
        <input className="form-control my-2"  type="password" name="password" id="password" onChange={formik.handleChange} value={formik.values.password} />

        <label htmlFor="rePassword">Confirm Password</label>
        <input className="form-control my-2"  type="password" name="rePassword" id="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} />


        {loading?<button type="button" className="btn btn-success my-4" id="btn_spin">
        <i className="fas fa-spinner fa-spin text-main text-white"></i>
          </button>
        :<button type="submit" className="btn btn-success my-4" id="btn_spin">
          Verify
        </button>}
      </form>
    
    </>
  );
}
