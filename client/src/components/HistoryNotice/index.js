import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import Lottie from 'lottie-react';
import ReportAnimation from '../../assets/animations/history-report.json'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const  HistoryNotice = () => {
  return (
    <div style={{padding: "40px 0"}}>
        <Container>
            <Card sx={{ display: 'flex', borderRadius: '16px', background: "linear-gradient(135deg, #ffcaca6b, #c8abff)", border: 0, padding: "1rem 1rem 1rem 2rem", gap: "32px" }} variant="outlined" >
                <Lottie animationData={ReportAnimation} style={{height: "12rem"}}/>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "flex-start" }}>
                    <Typography component="div" variant="h4" marginBottom={3} fontWeight={600} fontSize={{xs: "24px", md: "32px"}}>
                        Find all your report history at one place
                    </Typography>
                    <Link to="/report-history">
                        <Button variant="text" endIcon={<ArrowForwardIosRoundedIcon />} style={{padding: 0}} >
                            View History
                        </Button>
                    </Link>
                </Box>
            </Card>
        </Container>
    </div>
  );
}

export default  HistoryNotice;