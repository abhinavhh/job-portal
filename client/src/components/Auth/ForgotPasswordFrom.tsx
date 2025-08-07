import { motion } from "framer-motion";
import React, { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ResetPasswordFrom from "./ResetPasswordFrom";
import { useResetPassword } from "../../hooks/resetPassword";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ForgetPasswordFormProps {
  onSuccess: () => void;
}

const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { reset, toggleReset } = useResetPassword();
  const [verify, toggleVerify] = useState<boolean>(false);
  const navigate = useNavigate();

  const LockIcon = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center shadow-lg border border-blue-100">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-blue-600"
        >
          <path
            d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 10H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="15"
            r="2"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </motion.div>
  );

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "OTP has been sent to your email address");
        toggleVerify(true);
      } else {
        toast.error(data.message || "Failed to send OTP. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "OTP verified successfully");
        console.log("reset:", reset, "verify:", verify);
        toggleVerify(false);
        toggleReset();
      } else {
        toast.error(data.message || "Invalid OTP. Please check and try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSuccess = () => {
    onSuccess();
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("New OTP has been sent to your email");
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    onSuccess(); // Reset forget password state
    navigate("/login");
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-8 font-family-sans">
      {reset ? (
        <ResetPasswordFrom
          email={email}
          onSuccess={() => {
            toggleReset();
            handleResetSuccess();
            navigate("/login", { replace: true });
          }}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
            <LockIcon />
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-bold text-center text-xl sm:text-2xl text-gray-800 font-family-sans"
            >
              {verify ? "Verify OTP" : "Forgot Your Password?"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-center text-sm leading-relaxed mt-1 max-w-sm font-family-sans"
            >
              {verify
                ? "Enter the verification code sent to your email"
                : "Enter your email address and we'll send you a verification code"}
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={verify ? handleOtpSubmit : handleEmailSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: verify ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Input
              id={verify ? "otp" : "email"}
              name={verify ? "otp" : "email"}
              type={verify ? "text" : "email"}
              placeholder={verify ? "Enter 6-digit OTP" : "Enter your registered email"}
              value={verify ? otp : email}
              label={verify ? "Verification Code" : "Email Address"}
              onChange={(e) => verify ? setOtp(e.target.value) : setEmail(e.target.value)}
              disabled={isLoading}
            />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full transition-all duration-200"
              >
                {isLoading
                  ? (verify ? "Verifying..." : "Sending...")
                  : (verify ? "Verify OTP" : "Send Code")}
              </Button>
            </motion.div>
          </motion.form>

          {/* Extra Actions */}
          {verify && (
            <div className="text-center mt-4 font-family-sans">
              <p className="text-sm text-gray-600">Didn't receive the code?</p>
              <motion.button
                type="button"
                onClick={handleResendOTP}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm underline underline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resend OTP
              </motion.button>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center font-family-sans">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <motion.button
                type="button"
                onClick={handleBackToLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition duration-200"
              >
                Back to Login
              </motion.button>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ForgetPasswordForm;
