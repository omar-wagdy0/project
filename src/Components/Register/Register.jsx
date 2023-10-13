import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";

export default function Register() {
  let navigate = useNavigate()
  let [loading , setLoading] = useState(false)
  let [messageError , setmessageError] = useState('')
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validate,
    onSubmit: SubmitHandler,
  });

   async function SubmitHandler(values) {
    setLoading(true)
    
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup' ,values).catch((err)=>{
      setLoading(false)
      setmessageError(`${err.response.data.message}`)
      
    })

    if(data.message === 'success')
    {
      toast.success('Account Created Successfully')
      setLoading(false)
      navigate('/login')
    }
  }

  function validate(values) {
    let errors = {};

    if (!values.name) {
      errors.name = "Name is Required";
    } else if (values.name.length < 3) {
      errors.name = "Name Minlength is 3";
    } else if (values.name.length > 10) {
      errors.name = "Name Maxlength is 10";
    }


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


    if (!values.rePassword) {
      errors.rePassword = "Password Confirmation is Required";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = "Password doesn't match";
    } 



    if (!values.phone) {
      errors.phone = "Phone is Required";
    } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
      errors.phone = "Phone must be valid egyptian phone number";
    } 



    return errors;
  }

  return (
    <>
              <Helmet><title>Register</title></Helmet>

      <div className="w-75 mx-auto text-center py-4">
        <h3>Register</h3>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <label className="form-label" htmlFor="name">
          Name :
        </label>
        <input
         onBlur={formik.handleBlur}
          className="form-control mb-2"
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        {formik.errors.name && formik.touched.name?<div className="alert alert-danger">{formik.errors.name}</div>:null}

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
        {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}

        <label className="form-label" htmlFor="phone">
          Phone :
        </label>
        <input
         onBlur={formik.handleBlur}
          className="form-control mb-2"
          type="tel"
          name="phone"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />

{formik.errors.phone && formik.touched.phone?<div className="alert alert-danger">{formik.errors.phone}</div>:null}

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
        {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}

        <label className="form-label" htmlFor="repassword">
          Confirm Password :
        </label>
        <input
         onBlur={formik.handleBlur}
          className="form-control mb-2"
          type="password"
          name="rePassword"
          id="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
        />
        {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger">{formik.errors.rePassword}</div>:null}
       
        {messageError.length >0?<div className="alert alert-danger" role="alert">
         {messageError}
        </div>:null}



        {loading?<button type="button" className="btn btn-success my-4" id="btn_spin">
        <i className="fas fa-spinner fa-spin text-main text-white"></i>
          </button>
        :<button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-success my-4" id="btn_spin">
          Register
        </button>}
        
        
       


      </form>
    </>
  );
}
