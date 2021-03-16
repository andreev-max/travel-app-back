const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
	country: { type: String, required: true, unique: true },
	ratingArr: [ {
    owner: { type: Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true }
  } ]
});

module.exports = model('Rating', schema);
