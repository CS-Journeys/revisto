import User from "../models/user.js";

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
  
  

  passport.authenticate("local", (err, user, info) => {
    console.log("Attempting login.");
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return res.send(info);
    }
    req.logIn(user, (err) => {
      if (err) {
        throw err;
      }
      return res.send(user);
    });
  })(req, res);
  
};