const Product =  require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");



//Create Product --Admin
exports.createProduct = catchAsyncError(async (req,res,next)=>{
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    }); 
});



// Get All Product
exports.getAllProducts = catchAsyncError(async(req,res)=>{

    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // return next(new ErrorHandler("This is my temp error",500,next));
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
       success:true,
        products,
        productsCount,
        resultPerPage,
    });
});

//Get Product Details
exports.getProductDetails =catchAsyncError(
    async(req,res,next)=>{
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const product =await Product.findById(req.params.id);
        if(!product)
    {
     return next(new ErrorHandler("product not found",404));
    
    }
    
            res.status(200).json({
                success:true,
                product,
                // productCount,
            })
    }
)

//get product category
exports.getProductsByCategory = async (req, res, next) => {
    try {
      const category = req.params.category;
      const products = await Product.find({ category });
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

//Update Product --Admin

exports.updateProduct = catchAsyncError(async (req,res,next)=>{

    let product = Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    });
});

// Delete Product

exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

    // await product.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
        success:true,
        message:"Product is Deleted Successfully"
    })
      
}); 


// Create New Review or Update the Review
exports.createtProductReview = catchAsyncError(async(req,res,next) =>{
    const {rating,comment,productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    )

    if(isReviewed){
        product.reviews.forEach((rev) =>{
            if(rev.user.toString() === req.user._id.toString())
              (rev.rating = rating),(rev.comment = comment)
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }
    let avg=0;

    product.reviews.forEach(rev =>{
        avg+=rev.rating;
    })

    product.ratings =  avg/product.reviews.length;

    await product.save({validateBeforeSave : false});

    res.status(200).json({
        Success: true,
    })

});

// Get All Reviews of a product 
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    console.log("Query ID:", req.query.id); // Debugging statement

    const product = await Product.findById(req.query.id);

    if (!product) {
        console.log("Product not found for ID:", req.query.id); // Debugging statement
        return next(new ErrorHandler("Product not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//Delete Review
exports.deleteReview = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }

    const reviews = product.reviews.filter(rev=> rev._id.toString() !== req.query.id.toString());

    let avg=0;

    reviews.forEach((rev) =>{
        avg+=rev.rating;
    });

    const ratings =  avg/reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success: true,
        reviews:product.reviews,
    });
});