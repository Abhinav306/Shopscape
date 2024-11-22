import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import WebFont from "webfontloader";
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import ProductNavbar from "./components/layout/ProductNavbar.js";
import ProductListByCategory from './components/ProductListByCategory.js';
import Profile from "./component/User/Profile.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import Cart from "./component/Cart/Cart.js";
import LoginSignUp from './component/User/LoginSignUp.js';
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import CustomHeader from "./components/layout/CustomHeader.js";
import store from './store.js';
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOption.js";
import { useSelector } from 'react-redux';
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  // Custom hook to get current pathname
  const location = useLocation();

  return (
    <>
      <CustomHeader />
      {location.pathname !== "/login" && <ProductNavbar />}
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:category" element={<ProductListByCategory />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route 
          path="/account" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route 
          path="/me/update" 
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/password/update" 
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/shipping" 
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/success" 
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/order/confirm" 
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/order/:id" 
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </>
  );
}

// AppWrapper to include Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
