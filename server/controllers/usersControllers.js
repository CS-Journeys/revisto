import passport from "passport";
import { PasswordErrorCheck, validateEmail } from "../utils/sec.js";
import User from "../models/userModel.js";
import { createJWT, verifyJWT } from "../auth/jwtAuth.js";
import {SendPasswordReset} from "../utils/email.js";

// Get the current user
export const me = async (req, res) => {
  res.json({user:req.user});
};

export const register = async (req, res) => {
  if (req.user.userType != "guest") {
    return res.redirect("/");
  }

  const { email, password, region} = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.json({ err: "Email and password required"});
  }
  const PswdError = PasswordErrorCheck(password);
  if (PswdError!=="") {
    return res.json({ err: PswdError });
  }
  if (!validateEmail(email)) {
    return res.json({ err: "Invalid email" });
  }
  const user = new User({ email, region });
  User.register(user, password, (err, user) => {
    if (err) {
      return res.json({err: "Email already taken"});
    }
    res.json({status: "Success"});
  });
};

// Logs in the user (uses req.body.email and req.body.password)
export const login = async (req, res) => {
  if (req.user.userType != "guest") {
    return res.redirect("/");
  }
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
            const token = createJWT({userId:user._id});
            //Set the bearer token and redirect to the home page
            return res.json({ token });
          }
        });
      }
    }
  })(req,res);
};

export const updateUser = async (req, res) => {
  if (req.body.region) req.user.region = req.body.region;
  if (req.body.language) req.user.language = req.body.language;
  req.user.save((err) => {
    if (err) {
      res.json({ err: "CANTSAVE" });
    } else {
      res.json({ status: "Success" });
    }
  });
};

export const deleteUser = async (req, res) => {
  User.findByIdAndRemove(req.user._id, (err) => {
    if (err) {
      res.json({ err: "NOUSER" });
    } else {
      res.json({ status: "Success" });
    }
  });
};

export const requestPasswordReset = async (req, res) => {
  if (!req.body.email) {
    return res.json({ err: "NOEMAIL" });
  }
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      res.json({ err: "BADQUERY" });
    } else {
      if (!user) {
        res.json({ status: "Success" });
      } else {
        const token = createJWT({userId: user._id});
        SendPasswordReset(user.email, token)
          .then(() => {
            res.json({ status: "Success" });
          })
          .catch((err) => {
            res.json({ err: "INTERNAL" });
            console.log(err);
          });
      }
    }
  });
};

export const resetPassword = async (req, res) => {
  // has req.body.token and req.body.password
  verifyJWT(req.body.token).then(({ userId }) => {
    User.findById(userId, (err, user) => {
      if (err) {
        res.json({ err: "BADQUERY" });
      } else {
        if (!user) {
          res.json({ err: "NOTAUSER" });
        } else {
          user.setPassword(req.body.password, (err) => {
            if (err) {
              res.json({ err: "BADPASSWORD" });
            } else {
              user.save((err) => {
                if (err) {
                  res.json({ err: "CANTSAVE" });
                } else {
                  res.json({ status: "Success" });
                }
              });
            }
          });
        }
      }
    });
  }).catch(err => {
    res.json({ err: "BADTOKEN" });
  });
};
