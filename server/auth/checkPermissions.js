import dotenv from 'dotenv';
dotenv.config();

import {ENV} from '../constants.js';
import Permission from './models/permissionModel.js';
import User from '../models/userModel.js';


const checkPermissions = async (req, res, next) => {

  // Determine user type
  let userType = null;
  if (!req.token) {
    userType = 'guest';
  } else {
    await User.findById(req.token.userId).then(user => {
      userType = user.userType;
      req.user = user;
    });
  }

  // Determine the route (remove trailing '/')
  const route = req.path.replace(/\/$/, '');

  // Determine if user is authorized to make the request
  Permission.findOne({userType, route}, (err, permission) => {
    if (!permission || permission[req.method] == "") { // undefined
      if (ENV == "development") {
        console.log(`WARNING: Please define permissions for [${userType}, ${route}] before moving to production`);
        next();
      } else {
        console.error(`ERROR: Please define permissions for [${userType}, ${route}]`);
        res.status(403).json({err: "FORBIDDEN"});
      }
    } else if (permission[req.method] == "yes") {      // allowed
      next();
    } else {                                           // forbidden
      res.status(403).json({err: "FORBIDDEN"});
    }
  })
}

export default checkPermissions;