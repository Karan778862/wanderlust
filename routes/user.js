const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


const usercontroller = require("../controllers/users.js")

router
    .route("/singup")
    .get(usercontroller.renderSingupForm)
    .post( wrapAsync(usercontroller.singup));

router
    .route("/login")
    .get(usercontroller.renderLoginFrom)
    .post(saveRedirectUrl,passport.authenticate("local",{
            failureRedirect: '/login',
            failureFlash: true,
        }),usercontroller.login);


//-------------logout
router.get("/logout",usercontroller.logout);


module.exports = router;