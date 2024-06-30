const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlis/wrapAsync.js")
const Listing = require("../models/listing.js")
const {isLogged, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const{storage} = require("../cloudConfig.js")
const upload = multer({ storage })


router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post(isLogged,
    upload.single('listing[image]'), 
    validateListing,
wrapAsync(listingController.createListing)
);



//--------new
router.get("/new",isLogged, listingController.renderNewForm)

router
    .route("/:id")
    .get(wrapAsync( listingController.showListing))
    .put(isLogged,isOwner,
    upload.single('listing[image]'), 
    validateListing, 
    wrapAsync(listingController.updateListing))
    .delete(isLogged,isOwner,
    wrapAsync(listingController.destroyListing));


//new route
router.get("/new",isLogged, listingController.renderNewForm)






// edit route

router.get("/:id/edit",
isLogged,
isOwner,
 wrapAsync( listingController.renderEditForm));





module.exports = router;