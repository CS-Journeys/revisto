import createHttpError from "http-errors";

export default (req, res) => {
  // TODO: implement an actual solution
  throw createHttpError(403, "FORBIDDEN");
}