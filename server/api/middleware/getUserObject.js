import User from "../../core/models/userModel.js";

const getUserObject = async (req, res, next) => {
  if (req.token) {
    const user = await User.findById(req.token.userId).exec();
    if (user) {
      req.user = user;
      return next();
    }
  }
  
  req.user = { userType: "guest" };
  next();
}

export default getUserObject;