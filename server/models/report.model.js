const mongoose = require('mongoose')

const Report = new mongoose.Schema(
	{
		reportType: { type: String, required: true },
		dateOfTest: { type: Date, required: true },
		result: [{ 
			code: { type: String, required: true },
			value:{ type: Number, required: true },
			score:{ type: String, required: true },
			minValue: { type: Number },
			maxValue: { type: Number },
			units: { type: String }
		}],
		user: { type: Number }
	},
	{ collection: 'report-master' }
)

const model = mongoose.model('reportMaster', Report)

module.exports = model
