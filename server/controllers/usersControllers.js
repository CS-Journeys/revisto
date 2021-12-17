import passport from "passport";

import User from "../models/userModel.js";
import { createJWT } from "../auth/jwtAuth.js";

// Get the current user (uses req.token.userId)
export const me = async (req, res) => {
  const user = await User.findById(req.token.userId, "username region language");
  res.json({user});
};

// Create a new user with passport-local-mongoose
// (uses req.body.{username, password, region})
export const register = async (req, res) => {
  const user = new User({ username: req.body.username, region: req.body.region });

  User.register(user, req.body.password, (err, user) => {
    if (err) {
      return res.json({err:"USERTAKEN"});
    }
    res.json({status: "Success"});
  });
};

// Logs in the user (uses req.body.username and req.body.password)
export const login = async (req, res) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.json({ err: "INVALID" });
    } else {
      if (!user) {
        return res.json({ err: "INCORRECTLOGIN" });
      } else {
        req.login(user, function (err) {
          if (err) {
            return res.json({ err: "BADLOGIN" });
          } else {
            const token = createJWT(user._id);
            res.json({ token });
          }
        })
      }
    }
  })(req, res);
};

export const updateUser = async (req, res) => {
  User.findById(req.token.userId, (err, user) => {
    if (err) {
      res.json({ err: "NOUSER" });
    } else {
      if(req.body.region) user.region = req.body.region;
      if(req.body.language) user.language = req.body.language;
      user.save((err) => {
        if (err) {
          res.json({ err: "CANTSAVE" });
        } else {
          res.json({ status: "Success" });
        }
      });
    }
  });
};

export const deleteUser = async (req, res) => {
  User.findByIdAndRemove(req.token.userId, (err) => {
    if (err) {
      res.json({ err: "NOUSER" });
    } else {
      res.json({ status: "Success" });
    }
  });
};