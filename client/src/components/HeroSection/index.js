import { Button, Grid, Typography } from "@mui/material";
import Lottie from "lottie-react";
import BannerAnimation from "../../assets/animations/banner-animation.json"
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const HeroSection = () => {
    const handleClick = () => {
        document.getElementById("testListing").scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
    }
    return (
        <Grid container spacing={10} justifyContent="center" alignItems={"center"} padding={"40px 0"}>
            <Grid item md={4} xs={10} >
                <Typography variant="h4" gutterBottom >
                    Empowering Health Insights with Smart Reports
                </Typography>
                <Typography variant="subtitle1" gutterBottom  marginBottom={3}>
                    Transforming Lab Test Results into Actionable Knowledge
                </Typography>
                <Button variant="contained" endIcon={<ArrowForwardIosRoundedIcon />} onClick={() => { handleClick() }}>
                    Get Started
                </Button>
            </Grid>
            <Grid item md={4} xs={12} >
                <Lottie animationData={BannerAnimation} />
            </Grid>
        </Grid>
)}

export default HeroSection;