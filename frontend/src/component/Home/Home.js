import React, { Fragment , useEffect } from "react";
import { CgMouse } from 'react-icons/cg';
import "./Home.css";
import Product from "./ProductCard.js"
import Slider from  "./Slider.js"
import MetaData from "../layout/MetaData.js"
import {clearErrors, getProduct} from "../../actions/productAction"
import {useSelector,useDispatch} from "react-redux"
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert"
import data from "../data/data.json"






const Home = () => {

  const alert=useAlert();
  const dispatch = useDispatch();
  const{loading,error,products,productsCount} = useSelector(state=>state.products)



  useEffect(() =>{
    if(error){
      alert.error(error);
        dispatch(clearErrors());
    }
    dispatch(getProduct());
  },[dispatch,error,alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
        ):(
          <Fragment>
        <MetaData title="ECOMMERCE" />
        <div className="banner">
            {/* <p>Welcome to Ecommerce</p>
            <h1>Find Amazing Products Below</h1> */}
            <Slider start={data.banner.start}/>

            
        </div>
        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container">
            {products && products.map((product) => <Product product={product}/>)}
        </div>
    </Fragment>
        )}
    </Fragment>
  );
};

export default Home