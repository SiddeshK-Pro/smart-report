import * as React from 'react';
import Box from '@mui/material/Box';
import Steps from '../components/Stepper';
import { Button, Container, Stack } from '@mui/material';
import { Page } from '../components/Page/PageStyles';
import GenerateReportForm from '../components/GenerateReportForm';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import Report from '../components/Report';
import Navigation from '../components/Navigation';

const steps = ['Submit Test Result', 'Generate Smart Report'];

const GenerateReport = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [reportTypeData, setReportTypeData] = React.useState({});
  const [smartReportData, setSmartReportData] = React.useState({});
  const { reportId } = useParams();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 2);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 2);
  };

  const handleDownload = () => {

  }

  const fetchReportTypeData = async () => {
    const req = await fetch('http://localhost:1337/api/v1/report/' + reportId, {
        headers: {
            'x-access-token': localStorage.getItem('token'),
        },
    })
    const data = await req.json()

    if (data.status === 'ok') {
        setReportTypeData(data.data)
    }
  }
  
  const fetchReportData = async (id) => {
    const req = await fetch('http://localhost:1337/api/v1/user/report/' + id, {
        headers: {
            'x-access-token': localStorage.getItem('token'),
        },
    })
    const data = await req.json()

    if (data.status === 'ok') {
        setSmartReportData(data.data)
        handleNext()
    }
  }

  React.useEffect(() => {
    fetchReportTypeData()

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    if(id) fetchReportData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
        <Navigation />
        <Page>
            <Container style={{paddingTop: "40xp"}}>
                <Box sx={{ width: '100%' }}>
                <Steps steps={steps} activeStep={activeStep} />
                {activeStep === steps.length ? (
                    <>
                        <Report reportData={smartReportData} reportType={reportTypeData}/>
                        <Stack spacing={2} direction="row" marginBottom={4} justifyContent={"center"}>
                            <Button size="large" variant="contained" onClick={handleBack}>Re-Generate</Button>
                            <Button size="large" variant="contained" onClick={handleDownload}>Download</Button>
                        </Stack>
                    </>
                ) : (
                    <>
                        {reportTypeData && reportTypeData.tests && <GenerateReportForm fields={reportTypeData.tests} reportType={reportId} successCallBack={handleNext} reportState={setSmartReportData} defaultValue={{dateOfTest: smartReportData.dateOfTest, result : smartReportData.result}}/>}
                    </>
                )}
                </Box>
            </Container>
        </Page>
    </>
  );
}

export default GenerateReport;