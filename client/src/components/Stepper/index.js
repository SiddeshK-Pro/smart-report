import { Step, StepLabel, Stepper } from "@mui/material";

const Steps = ({steps, activeStep}) => (
    <Stepper activeStep={activeStep} style={{margin: "32px 0"}}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
)

export default Steps;