/**
 * guestbook.js
 * Model file for the guestbook data
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var mongoose = require('mongoose');


    var guestbookSchema = {
        name: { type: String, required: true, validate: [validateText, 'form-comment.guestbook_name_invalid']},
        age: { type: Number, required: true, min: [0, 'form-comment.guestbook_age_invalid'], max: 99 },
        date: { type: Date, default: Date.now },
        message: {type: String, required: [true, 'form-comment.guestbook_message_invalid']}
    };


    function validateText(str) {
        return str.length > 2 && str.length < 20;
    }

// Other way to add the validator
//guestbookModel.schema.path('name').validate(validateText,msgerr);

// The third parameter is to make sure that mongoose maps
// the schema to a collection called 'guestbook'
module.exports = mongoose.model('GuestBook', guestbookSchema, 'guestbook');