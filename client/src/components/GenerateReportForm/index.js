import { Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { getToken } from '../../utils/Authentication';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./style.css";
import dayjs from 'dayjs';

const GenerateReportForm = ({reportType, fields, successCallBack, reportState, defaultValue}) => {
	async function registerUser(event) {
		event.preventDefault()
		const rawData = new FormData(event.currentTarget);
		let formData = Object.fromEntries(rawData)
        const testDate = formData.dateOfTest;
        delete formData.dateOfTest;
        const formattedData = {
            reportType: reportType,
            dateOfTest: testDate,
            result: formData
        }

		const response = await fetch('http://localhost:1337/api/v1/user/report/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'x-access-token': getToken()
			},
			body: JSON.stringify(formattedData),
		})

		const data = await response.json()

		if (data.status === 'ok') {
            reportState(data.data)
			successCallBack();
		}
	}

    const getDefaultValue = (code) => {
        if(defaultValue.result && Array.isArray(defaultValue.result) && defaultValue.result.length > 0) {
            const field = defaultValue.result.find(obj => obj.code === code);
            return field && field.value ? field.value : "" 
        } 
        else {
            return ""
        }

    }

	return (
		<div style={{marginBottom: '40px'}}>
            <Typography variant="h4" gutterBottom style={{marginBottom: 32}}>
				Submit Test Result
			</Typography>
			<form onSubmit={registerUser} autoComplete="off">
                <Stack spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker name="dateOfTest" id="dateOfTest" format="MM/DD/YYYY" label="Date Of Test*" defaultValue={defaultValue.dateOfTest ? dayjs(defaultValue.dateOfTest) : dayjs(new Date())} required />
                    </LocalizationProvider>
                    <div className='form-grid'>
                        {fields && Array.isArray(fields) && fields.map((field, index) => (
                            <TextField
                                key={index}
                                label={field.name}
                                name={field.code}
                                id={field.code}
                                variant="outlined"
                                type="number"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{field.units}</InputAdornment>,
                                    step: "0.01"
                                }}
                                defaultValue={getDefaultValue(field.code)}
                            />
                        ))}
                    </div>
                    <Button size="large" type="submit" variant="contained">Generate Report</Button>
                </Stack>
			</form>
		</div>
	)
}

export default GenerateReportForm;
