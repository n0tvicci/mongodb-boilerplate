const {
  signup,
  signin,
  me,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("./controllers/user");
// const { contactUs } = require("./controllers/contact");
// const { upload } = require("./utils/fileUpload");

const passport = require("passport");
require("./services/passport")(passport);

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local-login", { session: false });

module.exports = function (app) {
  app.get("/", (req, res, next) => {
    res.send("Testing");
  });

  app.post("/api/signup", signup);
  app.post("/api/signin", requireSignIn, signin);
  app.get("/api/me", requireAuth, me);
  app.post("/api/profile", requireAuth, updateProfile);
  app.post("/api/changePassword", requireAuth, changePassword);
  app.post("/api/forgotPassword", forgotPassword);
  app.put("/api/resetpassword/:resetToken", resetPassword);
};
