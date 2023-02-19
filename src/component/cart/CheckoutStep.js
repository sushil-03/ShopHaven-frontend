import { Typography } from "@mui/material";
import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const CheckoutStep = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Detail</Typography>,
      icons: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icons: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icons: <AccountBalanceIcon />,
    },
  ];
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              icon={item.icons}
              style={{ color: activeStep >= index ? "green" : "red" }}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutStep;
