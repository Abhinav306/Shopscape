const express = require("express");
const cors = require('cors');
const app =express();
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const bodyParser = require("body-parser")
// const cloudinary = require("cloudinary")
const fileUpload = require("express-fileupload")
const path = require("path");
// const corsoptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 
// }

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use("/api/v1",user);

app.use("/api/v1",product);

app.use("/api/v1",order);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
// MiddleWare For Errors
app.use(errorMiddleware);

module.exports= app