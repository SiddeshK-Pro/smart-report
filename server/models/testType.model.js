const mongoose = require('mongoose')

const TestType = new mongoose.Schema(
	{
		code: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		minValue: { type: Number, required: true },
		maxValue: { type: Number, required: true },
		units: { type: String, required: true }
	},
	{ collection: 'test-type' }
)

const model = mongoose.model('testType', TestType)

module.exports = model
