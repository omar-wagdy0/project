import React, { useEffect, useState } from "react";
import styles from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";


export default function CategorySlider() {
  let [categories , setCategories] = useState([])
  

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };


  async function getCategories()
  {
    let {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
    setCategories(data.data)
  }

  useEffect(()=>{
    getCategories()
  })
  return (
    <>
      <Slider {...settings} className="d-none d-sm-block">
        {categories.map((category)=> <div className="row" key={category._id}>
              <img className="w-100" height={200} src={category.image} alt="" />
              <h3 className="h6 pt-2 text-center">{category.name}</h3>
            </div>)} 
      </Slider>

    </>
  );
}
