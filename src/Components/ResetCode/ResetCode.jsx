import React from "react";
import styles from "./ResetCode.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ResetCode() {
  let [loading , setLoading] = useState(false)
  let navigate = useNavigate()

  let formik = useFormik({
    initialValues:{
      resetCode:''
    },
    onSubmit: SubmitHandler
  })

  async function SubmitHandler(values)
  {
    setLoading(true)
    let response = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode',values).then((res)=>res).catch((Err)=>Err)
    console.log(response);
    setLoading(false)
    if(response.status === 200)
    {
      navigate('/ResetPassword')
    }
    else if (response.response.data.statusMsg === 'fail')
    {
      toast.error(response.response.data.message)
    }
  }

  return (
    <>
        <Helmet><title>Reset Code</title></Helmet>

            <h2 className="my-4">Reset Code</h2>

      <form onSubmit={formik.handleSubmit}>
        <input className="form-control my-2" placeholder="Please Enter Reset Code" type="text" name="resetCode" id="resetCode" onChange={formik.handleChange} value={formik.values.resetCode} />
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
