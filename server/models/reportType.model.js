const mongoose = require('mongoose')

const ReportType = new mongoose.Schema(
	{
		code: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
		tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'testType' }] 
	},
	{ collection: 'report-type' }
)

const model = mongoose.model('reportType', ReportType)

module.exports = model
