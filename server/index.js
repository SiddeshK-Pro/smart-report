require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const ReportType = require('./models/reportType.model')
const Report = require('./models/report.model')
const TestType = require('./models/testType.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { DB_HOST, ENCRYPT_KEY, HOST } = process.env;

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

app.use(cors())
app.use(express.json())

mongoose.connect(DB_HOST)

const createToken = (user) => {
	return jwt.sign(
		{
			name: user.name,
			mobile: user.mobile,
		},
		ENCRYPT_KEY
	)
}

app.post('/api/v1/user/register', async (req, res) => {
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		const user = await User.create({
			mobile: req.body.mobile,
			password: newPassword,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			dateOfBirth: req.body.dateOfBirth,
			gender: req.body.gender,
			quote: req.body.quote
		})
		const token = createToken(user)
		res.json({ status: 'ok', token })
	} catch (err) {
		res.json({ status: 'error', error: err })
	}
})

app.post('/api/v1/user/login', async (req, res) => {
	try {
	const user = await User.findOne({
		mobile: req.body.mobile,
	})
	if (!user) {
		return res.json({ status: 'error', error: 'Invalid login' })
	}
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = createToken(user)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api/v1/user/details', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, ENCRYPT_KEY)
		const mobile = decoded.mobile
		const user = await User.findOne({ mobile: mobile }, '-_id firstName lastName dateOfBirth gender')

		return res.json({ status: 'ok', data: user })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api/v1/user/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, ENCRYPT_KEY)
		const mobile = decoded.mobile
		const user = await User.findOne({ mobile: mobile })
		return res.json({ status: 'ok', data: user })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/v1/user/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, ENCRYPT_KEY)
		const mobile = decoded.mobile
		await User.updateOne(
			{ mobile: mobile },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api/v1/report/:code'
, async (req, res) => {
	const token = req.headers['x-access-token']
	const reportCode = req.params.code

	try {
		const decoded = jwt.verify(token, ENCRYPT_KEY)
		const reportData = await ReportType.findOne({ code: reportCode }, '-_id')

		if(!reportData) {
			return res.json({ status: 'FAILURE', data: "Report type: " + reportCode + " does not exists"})
		}

		const testsData = await TestType.find({ code: { $in: reportData.tests } }, '-_id name code units');
		reportData.tests = testsData;
		
		return res.json({ status: 'ok', data: reportData })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/v1/user/report/generate'
, async (req, res) => {
	const token = req.headers['x-access-token']
	const reportCode = req.params.code

	try {
		const decoded = jwt.verify(token, ENCRYPT_KEY)
		let  provideResult = req.body.result
		for (const key in provideResult) {
			if (provideResult[key] === '') {
				delete provideResult[key];
			}
		}
		const testCodes = Object.keys(provideResult)

		if(!testCodes) {
			return res.json({ status: 'FAILURE', data: "Test result not added"})
		}

		const testsData = await TestType.find({ code: { $in: testCodes } }, '-_id');

		
		const result = testsData.map(testType => {
			const value = parseFloat(provideResult[testType.code]);
			
			let score;
			if (value > testType.minValue && value < testType.maxValue) {
			  score = 'normal';
			} else if (value === testType.minValue || value === testType.maxValue) {
			  score = 'borderline';
			} else {
			  score = 'abnormal';
			}
	  
			return {
			  code: testType.code,
			  score,
			  value,
			  minValue: testType.minValue,
			  maxValue: testType.maxValue,
			  units: testType.units
			};
		});


		let data = {
			reportType: req.body.reportType,
			dateOfTest: req.body.dateOfTest,
			result: result,
			user: decoded.mobile
		}

		const report_data = await Report.create(data);

		const user = await User.findOne({ mobile: decoded.mobile }, '-_id -password -__v')
		data.user = user;
		data.id = report_data._id;

		return res.json({ status: 'ok', data: data })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api/v1/user/report/:id'
, async (req, res) => {
	const token = req.headers['x-access-token']
	const reportId = req.params.id

	try {
		const decoded = jwt.verify(token, ENCRYPT_KEY)
		const user = await User.findOne({ mobile: decoded.mobile }, '-_id -password -__v')

		const reportData = await Report.findById(reportId)

		if(!reportData) {
			return res.json({ status: 'FAILURE', data: "Report type: " + reportId + " does not exists"})
		}
		const { _id, result, reportType, dateOfTest} = reportData;
		const formatted_data = { id: _id, reportType, dateOfTest, result, user}

		return res.json({ status: 'ok', data: formatted_data })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api/v1/user/reports', async (req, res) => {
	const token = req.headers['x-access-token'];
	const page = parseInt(req.query.page) || DEFAULT_PAGE;
	const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
  
	try {
	  const decoded = jwt.verify(token, ENCRYPT_KEY);
	  const user = await User.findOne({ mobile: decoded.mobile }, '-_id -password -__v');
  
	  const skip = (page - 1) * limit;
  
	  const reports = await Report.find({ user: user.mobile }, '_id reportType dateOfTest').sort({ dateOfTest: -1 }).skip(skip).limit(limit);

	  const total = await Report.countDocuments({ user: user.mobile });

	  if (reports.length === 0) {
		return res.json({ status: 'error', data: "No reports founds" });
	  }
  
	  return res.json({ status: 'ok', data: reports, total });
	} catch (error) {
	  console.log(error);
	  res.json({ status: 'error', error: 'invalid token' });
	}
  });

app.listen(HOST, () => {
	console.log('\n\n-------------------------\nServer started on ' + HOST + "\n-------------------------\n\n")
})
