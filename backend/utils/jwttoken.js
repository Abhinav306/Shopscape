// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Ensure COOKIE_EXPIRE is defined and is a valid number
  const cookieExpire = parseInt(process.env.COOKIE_EXPIRE, 10);
  if (isNaN(cookieExpire)) {
    return res.status(500).json({
      success: false,
      message: "Cookie expiration time is not defined or is invalid in environment variables",
    });
  }

  // options for cookie
  const options = {
    expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
  console.log(token);
};

module.exports = sendToken;
