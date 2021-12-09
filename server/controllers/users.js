import User from "../models/user.js";
import passport from "passport";

export const me = async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id).populate("posts");
      res.send(user);
    }
    else {
      res.send("Login first");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const register = async (req, res) => {
  //Use passport-local-mongoose to create a new user
  
  const user = new User({ username: req.body.username, region: req.body.region });

  console.log(user);
  User.register(user, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      console.log("End Error");
      return res.send(err);
    }
    // console.log(req.user);
    res.send(user);
  });
};

export const login = async (req, res) => {
  passport.authenticate('local', function (err, user, info) { 
         if(err){
           res.json({success: false, message: err})
         } else{
          if (! user) {
            res.json({success: false, message: 'username or password incorrect'})
          } else{
            req.login(user, function(err){
              if(err){
                res.json({success: false, message: err})
              }else{
                // const token =  jwt.sign({userId : user._id, 
                //    username:user.username}, secretkey, 
                //       {expiresIn: '24h'})
                res.json({success:true, message:"Authentication successful"});
              }
            })
          }
         }
      })(req, res);
};