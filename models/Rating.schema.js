const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
	attraction: { type: String, required: true },
	owner: { type: Types.ObjectId, ref: 'User' },
	name: { type: String, Default: 'Unregistered raccoon :)' },
	value: { type: Number }
});

module.exports = model('Rating', schema);
