var mongoose = require('mongoose');

// define the schema
var schema = mongoose.Schema({
    url: { type: String, trim: true },
    title: { type: String, trim: true },
    body: String,
    date: { type: Date, default: Date.now},
    website:{ type: String, trim: true },
	position:{ type: String, trim: true },
	city:{ type: String, trim: true },
	province:{ type: String, trim: true },
	country:{ type: String, trim: true },
	employerName:{ type: String, trim: true },
	employerLogo:{ type: String, trim: true },
	salary:{ type: String, trim: true },
	experience:{ type: String, trim: true },
	timetable:{ type: String, trim: true },
	description:{ type: String, trim: true },
	reference:{ type: String, trim: true },
	category:{ type: String, trim: true },
	subcategory:{ type: String, trim: true },
	level:{ type: String, trim: true },
	employees:{ type: String, trim: true },
	vacancy:{ type: String, trim: true },
	studies:{ type: String, trim: true },
	experienceRequirements:{ type: String, trim: true },
	skills:Array,
	industrySector:{ type: String, trim: true }
})


// compile the model
var Offer = mongoose.model('Offer', schema,'offer');

module.exports = Offer;
