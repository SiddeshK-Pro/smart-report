import { useHistory } from 'react-router-dom'
import { Button, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { login } from '../../utils/Authentication';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function SignUpForm() {
	const history = useHistory()

	async function registerUser(event) {
		event.preventDefault()
		const rawData = new FormData(event.currentTarget);
		const formData = Object.fromEntries(rawData)
		console.log("data", formData)

		const response = await fetch('http://localhost:1337/api/v1/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			login(data.token, history)
		}
	}

	return (
		<div>
            <Typography variant="h4" gutterBottom style={{marginBottom: 32}}>
				Sign Up
			</Typography>
			<form onSubmit={registerUser} autoComplete="off">
                <Stack spacing={2}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        id="firstName"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        id="lastName"
                        variant="outlined"
                        required
                    />
                    <TextField
						type="number"
						label="Mobile"
						variant="outlined"
						InputProps={{
							startAdornment: <InputAdornment position="start">+91</InputAdornment>,
						}}
                        name="mobile"
					    id="mobile"
                        required
					/>
                    <TextField
                        label="Password"
                        name="password"
                        id="password"
                        variant="outlined"
                        required
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker name="dateOfBirth" id="dateOfBirth" label="Date Of Birth*" required />
                    </LocalizationProvider>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender *</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel name="gender" id="gender"  value="male" control={<Radio />} label="Male" required />
                            <FormControlLabel name="gender" id="gender"  value="female" control={<Radio />} label="Female" required />
                            <FormControlLabel name="gender" id="gender"  value="other" control={<Radio />} label="Other" required />
                        </RadioGroup>
                    </FormControl>
                    <Button size="large" type="submit" variant="contained">Sign Up</Button>
                    <Typography variant="body2" textAlign="center">
                        Already have an account? 
                        <Link to="/user/login" style={{marginLeft: 8}}>Login</Link>
                    </Typography>
                </Stack>
			</form>
		</div>
	)
}

export default SignUpForm
