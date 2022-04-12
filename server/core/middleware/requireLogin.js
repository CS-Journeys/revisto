import createHttpError from "http-errors";

const requireLogin = (req, res, next) => {
  if (req.user.userType == "guest") {
    throw createHttpError(403, "FORBIDDEN");
  }

  next();
}

export default requireLogin;