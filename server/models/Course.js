var mongoose = require('mongoose'),
	passportLocalMongoose = require("passport-local-mongoose");

var CoursesSchema = new mongoose.Schema({
	course			: String,
	department 		: String,
	institute		: String,
	addedBy			: String,
	removedBy		: { type: String, default: "none" },
	dateCourseAdded	: { type: Date, default: Date.now() }, 
	isRemoved		: { type: Boolean, default: false },
});

CoursesSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Course', CoursesSchema);