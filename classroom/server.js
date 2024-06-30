const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path")

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));



const  sessionOptions = {
        secret: "mysupersecretstring",
        resave: false,
        saveUninitialized: true,
    };
    app.use(session(sessionOptions));
    app.use(flash());

    app.use((req, ers, next) => {
        res.locals.message = req.flash("success");
        res.locals.message = req.flash("error");
        next();
    })


app.get("/register", (req, res) => {
    let {name = "un"} = req.query;
    req.session.name = name;
    if(name === "un"){
        req.flash("eroor", "user not register")
    }else{
        req.flash("success", "user register susseccfull")
    }
    res.redirect("/hello");
});

app.get("/hello", (req,  res) => {
    res.locals.message = req.flash("success");
    res.locals.errormsg = req.flash("success");
    res.render("page.ejs",{name: req.session.name});
})



// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//         req.session.count++;
//     }else{

//         req.session.count = 1;
//     }
//     res.send(`youer send a request ${req.session.count} count`)
// });



app.use("/users", users);
app.use("/posts", posts);




app.listen(3000, () =>{
  console.log("connect server on post 3000");
})