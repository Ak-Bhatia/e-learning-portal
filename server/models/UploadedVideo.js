var mongoose = require('mongoose'),
	passportLocalMongoose = require("passport-local-mongoose");

var UploadedVideosSchema = new mongoose.Schema({
	topicname		: String,
	desc			: String,
	owner			: String,
	videoUrl		: String,
	dateNoteAdded	: { type: Date, default : Date.now() },
	institute		: { type: String, default: "no-institute" },
	department		: { type: String, default: "no-dept" },
	course			: { type: String, default: "no-course" },
});

UploadedVideosSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('UploadedVideo', UploadedVideosSchema);