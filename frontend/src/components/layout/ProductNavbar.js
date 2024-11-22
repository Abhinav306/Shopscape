import React from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaTshirt, FaMobileAlt, FaBook, FaGem } from "react-icons/fa";
import "./ProductNavbar.css";

const ProductNavbar = () => {
  return (
    <nav className="product-navbar">
      <ul>
        <li>
          <Link to="/products/laptop">
            <FaLaptop className="icon" /> Laptops
          </Link>
        </li>
        <li>
          <Link to="/products/clothes">
            <FaTshirt className="icon" /> Clothes
          </Link>
        </li>
        <li>
          <Link to="/products/electronics">
            <FaMobileAlt className="icon" /> Electronics
          </Link>
        </li>
        <li>
          <Link to="/products/books">
            <FaBook className="icon" /> Books
          </Link>
        </li>
        <li>
          <Link to="/products/accessories">
            <FaGem className="icon" /> Accessories
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ProductNavbar;
