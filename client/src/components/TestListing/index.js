import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Lipid from "../../assets/icons/lipid.svg";
import CancerIcon from "../../assets/icons/cancer-screening.svg";
import { Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const TestListing = () => {
  return (
    <div style={{backgroundColor: "#9cccf063", padding: "40px 0"}} id="testListing">
      <Container padding={40}>
        <Typography textAlign="center" variant='h4' marginBottom={6}>Generate your reports</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent={"center"} alignItems={"center"} spacing={10}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 288 , margin: 2 }}
              image={Lipid}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lipid Profile
              </Typography>
              <Typography variant="body2" color="text.secondary" >
                This profile helps detect imbalance of lipid such as cholesterol, Triglycerides, etc. If left untreated, it increases the risk of cardiovascular diseases.
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/generate-report/LIPID_PROFILE">
                <Button size="small" style={{fontWeight: 700}}>Generate</Button>
              </Link>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 288, margin: 2 }}
              image={CancerIcon}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Cancer Screening
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Cancer screening is looking for cancer before a person has any symptoms. Screening tests can help find cancer at an early stage, before symptoms appear.
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/generate-report/CANCER_SCREENING">
                <Button size="medium" style={{fontWeight: 700}}>Generate</Button>
              </Link>
            </CardActions>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}

export default TestListing;