var mongoose = require('mongoose'),
	passportLocalMongoose = require("passport-local-mongoose");

var NotesSchema = new mongoose.Schema({
	topicname		: String,
	desc			: String,
	owner			: String,
	noteUrl			: String,
	dateNoteAdded	: { type: Date, default : Date.now() },
	institute		: { type: String, default: "no-institute" },
	department		: { type: String, default: "no-dept" },
	course			: { type: String, default: "no-course" },
});

NotesSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Note', NotesSchema);