import { useState } from 'react'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const LoginForm = () => {
	const [mobile, setMobile] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState('')

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/v1/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				mobile,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
		}
	}
	return (
		<>
			<Typography variant="h4" gutterBottom style={{marginBottom: 32}}>
				Login
			</Typography>
			<form onSubmit={loginUser}>
				<Stack spacing={4}>
					<TextField
						value={mobile}
						onChange={(e) => setMobile(e.target.value)}
						type="number"
						label="Mobile"
						variant="outlined"
						InputProps={{
							startAdornment: <InputAdornment position="start">+91</InputAdornment>,
						}}
                        required
					/>
					<FormControl  variant="outlined">
						<InputLabel htmlFor="password">Password *</InputLabel>
						<OutlinedInput
							id="password"
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
								</InputAdornment>
							}
							label="Password"
							value={password}
						    onChange={(e) => setPassword(e.target.value)}
                            required
						/>
					</FormControl>
					<Button size="large" type="submit" variant="contained">Login</Button>
					<Typography variant="body2" textAlign="center">
						Don't have account? 
						<Link to="/user/signup" style={{marginLeft: 8}}>Sign Up</Link>
					</Typography>
				</Stack>
			</form>
		</>
	)
}

export default LoginForm;