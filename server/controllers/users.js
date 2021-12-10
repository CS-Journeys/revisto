import User from "../models/user.js";
import { createJWT } from "../auth/auth-jwt.js";
import passport from "passport";

export const me = async (req, res) => {
  const user = await User.findById(req.token.userId,'username region language');
  res.json(user);
};

export const register = async (req, res) => {
  //Use passport-local-mongoose to create a new user
  
  const user = new User({ username: req.body.username, region: req.body.region });

  console.log(user);
  User.register(user, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.json({err:"USERTAKEN"});
    }
    res.json({
      user: {
        username: user.username,
        region: user.region,
        language: user.language
    }});
  });
};

export const login = async (req, res) => {
  passport.authenticate('local', function (err, user, info) { 
         if(err){
           res.json({err:"INVALID"});
         } else{
          if (! user) {
            res.json({err:"USERNOTFOUND"});
          } else{
            req.login(user, function(err){
              if(err){
                res.json({err:"BADLOGIN"});
              }else{
                const token = createJWT(user._id);
                res.json({token});
              }
            })
          }
         }
      })(req, res);
};