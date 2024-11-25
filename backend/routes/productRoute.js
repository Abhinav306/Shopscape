const express = require("express");
const { getAllProducts,
        createProduct,
        updateProduct, 
        deleteProduct, 
        getProductDetails, 
        createtProductReview, 
        getProductReviews,
        deleteReview,
        getProductsByCategory } = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authentication");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
    .route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createtProductReview);

router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

// New route for fetching products by category
router.route("/products/category/:category").get(getProductsByCategory);

module.exports = router;
