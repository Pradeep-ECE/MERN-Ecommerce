const jwt = require("jsonwebtoken");
const { TE, to, ReE, ReS } = require("../global_functions");

async function authToken(req, res, next) {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      return ReE(
        res,
        {
          data: [],
          message: "User Is Not Login",
          error: true,
          success: false,
        },
        200
      );
    }
    jwt.verify(token, CONFIG.jwt_encryption, function (err, decoded) {
      console.log(err);

      console.log("decoded", decoded); // bar

      if (err) {
        if (err.name === "TokenExpiredError") {
          return ReE(
            res,
            {
              data: [],
              message: "Session expired. Please login again.",
              error: true,
              success: false,
            },
            401
          );
        }
        return ReE(
          res,
          {
            data: [],
            message: err.message,
            error: true,
            success: false,
          },
          400
        );
      }

      req.user = {
        id: decoded?.id,
        email: decoded?.email,
      };
    });
  } catch (err) {
    return ReE(res, {
      data: [],
      message: err.message,
      error: true,
      success: false,
    });
  }
  next();
}

module.exports = authToken;
