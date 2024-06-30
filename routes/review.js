const express = require("express");
const router = express.Router({mergeParams: true });
const wrapAsync = require("../utlis/wrapAsync.js")
const ExpressError = require("../utlis/expressError.js")
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js")
const {validateReview, isLogged, isReviewAuthor} = require("../middleware.js")



const reviewController = require("../controllers/reviews.js");

//----------reviews post router--
router.post("/", 
isLogged,
validateReview, wrapAsync(reviewController.createReview));


//------Delete reviews Route

router.delete("/:reviewId",
isLogged,
isReviewAuthor,
 wrapAsync(reviewController.destroyReview))

module.exports = router;