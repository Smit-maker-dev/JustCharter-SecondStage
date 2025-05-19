import React, { useState } from "react";
import ForgetPasswordDialog from "./ForgetPasswordDialog";
import VerifyOtpDialog from "./VerifyOtpDialog";
import ChangePasswordDialog from "./ChangePasswordDialog"; 

export default function AuthDialogFlow({ onClose, initialStep }) {
  const [step, setStep] = useState(initialStep || "forgetPassword");
  const [otpData, setOtpData] = useState({ email: "", otpId: "" });

  const handleForgetPasswordSuccess = ({ email, otpId }) => {
    setOtpData({ email, otpId });
    setStep("verifyOtp");
  };

  const handleOtpSuccess = () => {
    setStep("changePassword");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {step === "forgetPassword" && (
        <ForgetPasswordDialog
          open={true}
          onClose={handleClose}
          onSuccess={handleForgetPasswordSuccess}
        />
      )}

      {step === "verifyOtp" && (
        <VerifyOtpDialog
          open={true}
          onClose={handleClose}
          email={otpData.email}
          otpId={otpData.otpId}
          onSuccess={handleOtpSuccess}
        />
      )}

      {step === "changePassword" && (
        <ChangePasswordDialog
          open={true}
          onClose={handleClose}
        />
      )}
    </>
  );
}
