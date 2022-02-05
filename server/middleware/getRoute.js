import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const getRoute = (req, res, next) => {
  let route = req.path.replace(/\/$/, '');

  let pathFragments = route.split('/');
  pathFragments.forEach((pathFragment, index) => {
    if (ObjectId.isValid(pathFragment)) {
      pathFragments[index] = ":id";
    }
  });

  req.route = pathFragments.join('/');

  next();
}

export default getRoute;