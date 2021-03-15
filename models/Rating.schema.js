const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
	country: { type: String, required: true },
	rating: [ { type: Number } ]
});

module.exports = model('Rating', schema);