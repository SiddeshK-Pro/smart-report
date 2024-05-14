const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		mobile: { type: Number, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		dateOfBirth: { type: Date, required: true },
		gender: { type: String, required: true }
	},
	{ collection: 'user-master' }
)

const model = mongoose.model('userMaster', User)

module.exports = model
