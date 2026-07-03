import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const steps = ['Personal Details', 'Bank Details' , 'Profile Complete'];

export default function ProfileIncompleteErr() {
  const isStepFailed = (step) => {
    return step === 1;
  };

  return (
    <Box sx={{ width: '50%' }}>
      <Stepper activeStep={1}>
        {steps.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error" sx={{color:"red"}}>
                <Link to="/Dashboard/Profile/">Click here to Complete</Link>
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}