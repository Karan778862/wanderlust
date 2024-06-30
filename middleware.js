const Listing = require("./models/listing");
const Review = require("./models/reviews");
const ExpressError = require("./utlis/expressError.js")
const {listingSchema, reviewSchema } = require("./schema.js");



//-------------middleware--isLogged

module.exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing");
       return res.redirect("/login");
    }
    next();
};

//-------------middleware--saveRedirectUrl
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

//-------------middleware--isOwner

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
  let listing = await Listing.findById(id);
if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error", "you not the owner this listing");
    return res.redirect(`/listings/${id}`);
}
next();
   
}

//-------------middleware--validateListing
module.exports.validateListing =(req, res, next) => {
    let {error} = listingSchema.validate(req.body);
   if(error){
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
   }else{
    next();
   }
};

//-------------middleware--validateReview
module.exports.validateReview =(req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
   if(error){
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
   }else{
    next();
   }
};

//---------middleware---reviews--delete

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error", "you not the Author this reviews");
    return res.redirect(`/listings/${id}`);
}
next();
   
}
