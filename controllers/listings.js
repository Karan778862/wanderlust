const Listing = require("../models/listing")


//--------index----
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({})
    res.render("./listings/index.ejs", {allListings});

}

//---------new route
module.exports.renderNewForm = (req, res) => {   
    res.render("./listings/new.ejs")
}


//-------------show route
module.exports.showListing = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews",populate: {path: "author"}}).populate("owner")
    if(!listing){
        req.flash("error", "LIsting you requsted for dose not exist!");
        res.redirect("/listings");
    }
    res.render("../views/listings/show.ejs",{listing});
    }


// ---------create route
module.exports.createListing = async(req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
     await newListing.save();
    req.flash("success", "new Listing create");
    res.redirect("/listings")

}    


//-------edit route
module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
const listing = await Listing.findById(id);
if(!listing){
    req.flash("error", "LIsting you requsted for dose not exist!");
    res.redirect("/listings");
}
    res.render("./listings/edit.ejs",{listing});
}


//-------update route
module.exports.updateListing =  async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing});
    if(typeof req.file !=="undefine"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save()
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
    
}

//----------delete route
module.exports.destroyListing = async(req, res) => {
    let {id} = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}
