import axios from "axios";
import{ 
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/productConstants"

export const getProduct = (keyword ="" , currentPage=1) => async (dispatch) =>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});
        const { data } = await axios.get(`https://shopscape-o8gh.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}`);
        console.log(data);

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const { data } = await axios.get(`https://shopscape-o8gh.onrender.com/api/v1/product/${id}`);
      
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Clearing Errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS});
}
