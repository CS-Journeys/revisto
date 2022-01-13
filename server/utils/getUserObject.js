import User from '../models/userModel.js';

const getUserObject = async (req, res, next) => {
  if (req.token) {
    await User.findById(req.token.userId).then(user => {
      req.user = user;
    });
  } else {
    req.user = { userType: 'guest' };
  }
  next();
}

export default getUserObject;