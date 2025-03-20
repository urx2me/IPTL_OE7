const express = require("express");
const passport = require("passport");

const router = express.Router();

// ✅ Google authentication route
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Google OAuth callback route
router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login"
  })
);

// ✅ Fixed Logout Route (Handles Errors and Session Destroy)
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Handle any error
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // Ensure session cookie is removed
      res.redirect("http://localhost:3000"); // Redirect to homepage/login
    });
  });
});

// ✅ Get logged-in user data
router.get("/user", (req, res) => {
  res.send(req.user || null);
});

module.exports = router;
