// Library
import express, { Router } from "express";
import passport from "passport";

// Models
import { UserModel } from "../../database/allModels";

// Validations
import { ValidateSignup, ValidateSignin } from "../../validation/auth";

// Create a router
const router = express.Router();

/**
 * Route    /signup
 * Des      Register new user
 * Params   None
 * Access   Public
 * Method   POST
 */
router.post("/signup", async (req, res) => {
  try {
    await ValidateSignup(req.body.credentials);
    await UserModel.findByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();

    return res.status(200).json({ token, status: "Success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route    /signin
 * Des      Signin with email and password
 * Params   None
 * Access   Public
 * Method   POST
 */
router.post("/signin", async (req, res) => {
  try {
    await ValidateSignin(req.body.credentials);
    
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();

    return res.status(200).json({ token, status: "Success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route    /google
 * Des      Google signin
 * Params   None
 * Access   Public
 * Method   GET
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/**
 * Route    /google/callback
 * Des      Google signin Callback
 * Params   None
 * Access   Public
 * Method   GET
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res
      .status(200)
      .json({ token: req.session.passport.user.token, status: "success" });
  }
);

/**
 * Router       /google/callback
 * Des          Google signin callback
 * Params       none
 * Access       Public
 * Method       GET
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.redirect(
      `https://62c140fd207c5252fdaaadf9--celebrated-froyo-95065b.netlify.app/google/${req.session.passport.user.token}`
    );
  }
);

export default router;
