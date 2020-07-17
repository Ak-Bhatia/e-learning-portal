var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username			: String,
	name				: String,
	role				: String,
	password			: String,
    rollno				: { type: String, default: "none" },
	dateUserAdded		: { type: Date, default: Date.now() }, 
	course				: { type: String, default: "none" },
	institute			: { type: String, default: "none" },
	department			: { type: String, default: "none" },
	isVerified			: { type: Boolean, default: false },
	verifiedBy			: { type: String, default: "none" },
	dateUserVerified	: { type: Date, default: Date.now() }, 
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);