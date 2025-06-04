/**
 *  Copyright 2023 Shadowcast
 *  Project Name - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Creator = require("../models/Creator");
const User = require("../models/User");
const appConstant = require('../utils/constant')

const { sendResponse } = require("../utils/responseHandler")

/**
 * 
 * @param {*} data 
 * @returns jwt.sign(data, "secretAccessKey")
 */
exports.jwtSign = async (data, res) => {
  try {
    let santetizeData= santetize(data)
    return jwt.sign(santetizeData, process.env.ADMIN_SECRET, { expiresIn: '30d' });

  } catch (err) {

    return sendResponse(res, null, 401, err.message, 1, 0);
  }
};

/**
 *
 * @param {*} params
 * @returns "sanatizeData"
 */
function santetize(params) {
  return params;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns jwt.verify(token, "secretAccessKey", (err, decode)
 */
let selector = {
  admin: { secret: process.env.ADMIN_SECRET, model: Admin },
  user: { secret: process.env.USER_SECRET, model: User },
  creator: { secret: process.env.CREATOR_SECRET, model: Creator },
};

// Protect routes
exports.protect = (userType) => {
  return async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

   
    // Make sure token exists
    if (!token) {
      return sendResponse(res, {}, 401, appConstant.UNAUTHORIZED, 108, 0);
      // return next(new ErrorResponse(`Not authorize to access this route`, 401));
    }

    try {
      // Verify token
      const decoded =  jwt.verify(token, selector[userType]?.secret);
      // console.log(decoded);
      let user = await selector[  userType].model.findOne({_id:decoded?.userId});

      if (!user) {
        return sendResponse(res, {}, 401, appConstant.UNAUTHORIZED, 108, 0)
      }
    
      req.user = decoded;
      req.userType = userType;

      next();
    } catch (err) {
      console.log(`error: ${err}`);
      return sendResponse(res, {}, 401, appConstant.UNAUTHORIZED, 108, 0);
      // return next(new ErrorResponse(`Something went wrong in protected route`, 401));
    }
  }
};


exports.protectRole = (accountTypes, groups) => {
  return async (req, res, next) => {
   

    console.log("Account Types:", accountTypes);
    console.log("Groups:", groups);
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
      return sendResponse(res, {}, 401, appConstant.UNAUTHORIZED, 1, 0);
    }

    try {
      let foundUser = false;

      for (let userType of accountTypes) {
        // Check if the userType is admin
        if (userType === "admin") {
          let adminSecret = selector["admin"]?.secret;

          if (adminSecret) {
            try {
              const decoded = jwt.verify(token, adminSecret);
              req.user = decoded;
              req.userType = "admin";
              foundUser = true;
              if (groups && groups.length > 0) {
                console.log(groups); // Only print groups if admin token is used
              }
              break; // Exit loop if a valid user type is found
            } catch (error) {
              // Token verification failed for admin, continue to the next user type
              continue;
            }
          }
        } else {
          // For other user types (user or creator)
          try {
            const decoded = jwt.verify(token, selector[userType]?.secret);
            console.log(decoded); // Print decoded data for user or creator
            let user = await selector[userType].model.findOne({ _id: decoded?.userId });

            if (!user) {
              return sendResponse(res, {}, 401, appConstant.UNAUTHORIZED, 108, 0);
            }

            req.user = decoded;
            req.userType = userType;
            foundUser = true;
            break; // Exit loop if a valid user type is found
          } catch (err) {
            // Token verification failed for this user type, continue to the next one
            continue;
          }
        }
      }

      if (!foundUser) {
        return sendResponse(res, {}, 401, appConstant.UNAUTHORIZED, 1, 0);
      }

      next();
    } catch (err) {
      console.log(`error: ${err}`);
      return sendResponse(res, {}, 401, appConstant.UNAUTHORIZED, 1, 0);
    }
  };
};







// exports.protect = (req, res, next) => {
//   try {

//     let token = req.headers.authorization

//     if (!token) {

//       return sendResponse(res, null, 401, null, 115, 0);

//     }

//     let splitted = token.split("Bearer ")[1]

//     jwt.verify(splitted, process.env.USER_SECRET, (err, decode) => {
//       if (err) return sendResponse(res, null, 401, err.message, 1, 0);
//       req.user = decode;
//       return next();
//     });


//   } catch (err) {

//     return sendResponse(res, null, 401, err.message, 1, 0);
//   }
// };

/**
 *
 * @param {*} data
 * @returns jwt.sign(data, "secretAccessKey")
 */
exports.jwtSignForPassword = async (data = {}, res, time) => {
  try {

    let santetizeData= santetize(data)

    return jwt.sign(santetizeData, process.env.ADMIN_SECRET, { expiresIn: time });
  } catch (err) {
    return sendResponse(res, null, 401, err.message, 1, 0);
  }
};