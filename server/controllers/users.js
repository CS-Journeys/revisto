import User from '../models/user.js';

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('posts');
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const register = async (req, res) => {
  //Use passport-local-mongoose to create a new user
  const user = new User(req.body);
  User.register(user, req.body.password, (err, user) => {
      if (err) {
        return res.send("Email already taken maaaybe?");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  );
};
