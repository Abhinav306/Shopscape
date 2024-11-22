import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import "./CustomHeader.css";

const CustomHeader = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <div className="icons">
        <Link to="/search"><FaSearch /></Link>
        <Link to="/cart"><FaShoppingCart /></Link>
        <Link to="/login"><FaUser /></Link>
      </div>
    </header>
  );
};

export default CustomHeader;
