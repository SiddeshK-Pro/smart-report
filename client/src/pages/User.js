import Lottie from "lottie-react";
import girlAnimation from "../assets/animations/girlAnimation.json";
import { Container, Grid } from '@mui/material';
import { Page } from '../components/Page/PageStyles';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";


const User = () => {
	return (
	<Page>
		<Container>
			<Grid container spacing={10} justifyContent="center" alignItems={"center"}>
				<Grid item md={6} xs={10} >
					<Lottie animationData={girlAnimation} loop={false} />
				</Grid>
				<Grid item md={4} xs={10}>
				<Switch>
					<Route
						path="/user/login"
						component={LoginForm}
					/>
					<Route
						path="/user/signup"
						component={SignUpForm}
					/>
				</Switch>
				</Grid>
			</Grid>
		</Container>
	</Page>
)}

export default User;
