const User = require("../models/user");


//------singup get
module.exports.renderSingupForm = (req, res ) => {
    res.render("users/singup.ejs");
}


//------singup post 
module.exports.singup = async(req, res) => {
    try{

        let {username, email, password} = req.body;
       const newUser = new User({email, username});
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if(err) {
            return next()
        }
        req.flash("success","welcom to app");
        res.redirect("/listings");
      })
     
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/singup");
    }

}


//---------login get 
module.exports.renderLoginFrom =  (req, res) => {
    res.render("users/login.ejs")
}


//---------login post
module.exports.login = async(req, res) => {
    req.flash("success", "welcom to wnderlust! you are legged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    }


//-------------logout 
module.exports.logout =  (req, res, next) => {
    req.logOut((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "you are logged out new");
        res.redirect("/listings");
    })
}    