import passport from "passport";
import createHttpError from "http-errors";
import asyncHandler from "express-async-handler";

import User from "../../core/models/userModel.js";
import { createJWT, verifyJWT } from "../../core/utils/jwtAuth.js";
import { SendPasswordReset } from "../../services/email/email.js";
import { validateEmail, validatePassword } from "../../core/utils/validator.js";

// Get the current user
export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

// Register a new user
export const register = asyncHandler(async (req, res) => {
  const { email, password, region } = req.body;

  validateEmail(email);
  validatePassword(password);

  const user = new User({ email, region });
  await User.register(user, password);

  res.end();
});

// Log in the user
export const login = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(createHttpError(400, "Bad Request"));
    if (!user) return next(createHttpError(400, "Incorrect login"));

    // Create token for 1 week if "Remember Me" is checked, otherwise 24 hours
    if (req.body.rememberMe) {
      console.log("ok i will");
      const token = createJWT({ userId: user._id }, "1w");
      res.json({ token });
    } else {
      console.log("ok i wont");
      const token = createJWT({ userId: user._id }, "24h");
      res.json({ token });
    }
  })(req, res, next);
});

// Update the current user's data
export const updateUser = asyncHandler(async (req, res) => {
  let user = req.user;
  if (req.body.region) user.region = req.body.region;
  if (req.body.language) user.language = req.body.language;

  await user.save();

  res.end();
});

// Delete the current user from the db
export const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndRemove(req.user._id).exec();

  res.status(204).end();
});

// Request a password reset for the given email address
export const requestPasswordReset = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  const token = createJWT({ userId: user._id }, "2h");

  await SendPasswordReset(user.email, token);

  res.end();
});

// Reset the password for the user with the given token
export const resetPassword = asyncHandler(async (req, res) => {
  const userId = await verifyJWT(req.body.token);
  const user = await User.findById(userId).exec();

  user.setPassword(req.body.password);
  await user.save();

  res.end();
});
