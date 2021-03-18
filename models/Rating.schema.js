const { Schema, model, Types } = require('mongoose');

// const schema = new Schema({
// 	attraction: { type: String, required: true },
// 	ratingArr: {
//     owner: { type: Types.ObjectId, ref: 'User' },
//     value: { type: Number }
//   }
// });

const schema = new Schema({
	attraction: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'User' },
	value: { type: Number }
});

module.exports = model('Rating', schema);
