import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login(props) {
  let navigate = useNavigate()
  let [loading , setLoading] = useState(false)
  let [messageError , setmessageError] = useState('')
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: SubmitHandler,
  });

  async function SubmitHandler(values) {
    setLoading(true)
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin' ,values).catch((err)=>{
      setLoading(false)
      setmessageError(`${err.response.data.message}`)  
    })
    if(data.message === 'success')
    {
      
      localStorage.setItem('userToken', data.token)
      console.log(localStorage.getItem('userToken'));
      props.saveUserData()
      setLoading(false)
      navigate('/')
    }
  }

  function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email is Invalid";
    } 
    if (!values.password) {
      errors.password = "Password is Required";
    } else if (!/^[A-Za-z]\w{7,14}$/.test(values.password)) {
      errors.password = "Password must be difficult";
    } 
    return errors;
  }

  return (
    <>
              <Helmet><title>Login</title></Helmet>

      <div className="w-75 mx-auto text-center py-4">
        <h3>Login</h3>
      </div>

      <form onSubmit={formik.handleSubmit}> 
        <label className="form-label" htmlFor="email">
          Email :
        </label>
        <input
          onBlur={formik.handleBlur}
          className="form-control mb-2"
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {/* {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null} */}

        <label className="form-label" htmlFor="password">
          Password :
        </label>
        <input
          onBlur={formik.handleBlur}
          className="form-control mb-2"
          type="password"
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {/* {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null} */}

            {messageError.length >0?<div className="alert alert-danger" role="alert">
         {messageError}
        </div>:null}

        {loading?<button type="button" className="btn btn-success my-4" id="btn_spin">
        <i className="fas fa-spinner fa-spin text-main text-white"></i>
          </button>
        :
        <>
        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-success my-4" id="btn_spin">
          Login
        </button>

      

        </>
        }
      </form>
      <Link className="text-danger h6" to={'/ForgotPassword'}>Forgot Password?</Link>

      <div className="my-4">
      <Link className="text-dark d-inline" to={'/Register'}>Don't have an account ? <span className="text-success fw-bold "> <u>Register Now</u>  </span> </Link>
      </div>

      
    </>
  );
}
