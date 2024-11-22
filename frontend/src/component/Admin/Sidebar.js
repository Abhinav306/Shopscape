import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/admin/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
    { to: "/admin/products", icon: <PostAddIcon />, label: "All Products" },
    { to: "/admin/product", icon: <AddIcon />, label: "Create Product" },
    { to: "/admin/orders", icon: <ListAltIcon />, label: "Orders" },
    { to: "/admin/users", icon: <PeopleIcon />, label: "Users" },
    { to: "/admin/reviews", icon: <RateReviewIcon />, label: "Reviews" },
  ];

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className={location.pathname === link.to ? "active" : ""}
          aria-label={link.label}
        >
          <p>
            {link.icon} {link.label}
          </p>
        </Link>
      ))}
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
          </Link>
          <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default Sidebar;
