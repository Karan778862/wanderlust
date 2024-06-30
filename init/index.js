const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connect to db");
}).catch((err) => {
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    await listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "65c9c887f51c16359d12f0b4"}));
    await listing.insertMany(initData.data);
    console.log("data was init");
}

initDB();
