
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, verifyOtp, afterVerification } from "../redux/thunks/forgotPasswordThunks";
import { fetchMasterAdminProfileData } from "../redux/thunks/masteradminProfileThunks";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.forgot);
  const UserId = useSelector((state) => state.auth?.userId);

  useEffect(() => {
    if (UserId) {
      dispatch(fetchMasterAdminProfileData(UserId));
    }
  }, [dispatch, UserId]);

  const handleSendOTP = async () => {
    if (!email) return alert("Please enter a valid email");
    try {
      await dispatch(forgotPassword({ email })).unwrap();
      setStep(2);
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) return alert("Please enter the OTP");
    try {
      await dispatch(verifyOtp({ email, otp })).unwrap();
      setStep(3);
    } catch (err) {
      console.error("Error verifying OTP:", err);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) return alert("Passwords do not match");
    try {
      await dispatch(afterVerification({ email, newPassword, confirmNewPassword: confirmPassword })).unwrap();
      alert("Your password has been reset!");
    } catch (err) {
      console.error("Error resetting password:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-200 m-6">
        <h2 className="sm:text-2xl font-bold text-center mb-4">
          {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {status === "loading" && <p className="text-center">Processing...</p>}
        {step === 1 && (
          <>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded-lg mb-4" />
            <button onClick={handleSendOTP} className="w-full bg-indigo-600 text-white text-md p-2 rounded-lg" disabled={status === "loading"}>Send OTP</button>
          </>
        )}
        {step === 2 && (
          <>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full border p-2 rounded-lg mb-4" />
            <button onClick={handleVerifyOTP} className="w-full bg-indigo-600 text-white p-2 rounded-lg" disabled={status === "loading"}>Verify OTP</button>
          </>
        )}
        {step === 3 && (
          <>
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border p-2 rounded-lg mb-4" />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border p-2 rounded-lg mb-4" />
            <button onClick={handleResetPassword} className="w-full bg-green-600 text-white p-2 rounded-lg">Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
