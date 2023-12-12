import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import UserDetails from "./useDetails";
import AddressDetails from "./AddressDetails";
import Summary from "./Summary";

const steps = ["User Details", "Address Details", "Summary"];

export default function StepperComponent() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && <UserDetails handleNext={handleNext} />}
      {activeStep === 1 && (
        <AddressDetails handleNext={handleNext} handleBack={handleBack} />
      )}
      {activeStep === 2 && <Summary handleBack={handleBack} />}
    </div>
  );
}
