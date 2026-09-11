import { useRef, useState } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

const StepOTP = ({ onNext }) => {
  const [otpArray, setOtpArray] = useState(new Array(4).fill(""));
  const inputRef = useRef([]);
  const { verifyOtpRequest } = useAuth();

  const { displayTime, isExpired } = useCountdown({
    initialTimeInSeconds: 2 * 60,
  });

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otp = parseInt(otpArray.join(""), 10);
    verifyOtpRequest(otp, onNext);
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
    // API call for resending OTP
  };

  const handleClearOtp = () => {
    setOtpArray(new Array(4).fill(""));
    inputRef.current[0]?.focus();
  };

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    if (!isNaN(parseInt(value))) {
      setOtpArray([...otpArray.map((d, idx) => (idx === index ? value : d))]);

      // Focus on next input
      if (value !== "" && index < inputRef.current.length - 1) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 px-10 py-6">
      <h2 className="text-center text-lg font-semibold">
        Enter the code was just mailed to you
      </h2>
      <p className="text-center text-sm text-gray-500">
        If you don't have an account, we'll create one for you.
      </p>

      {/* OTP Input */}
      <div className="flex items-center justify-center">
        {otpArray.map((digit, index) => (
          <input
            key={index}
            ref={(ref) => (inputRef.current[index] = ref)}
            type="text"
            name="otp"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            className="w-12 h-12 font-bold text-center rounded-md mx-1 border border-gray-200 text-white-500 outline-none"
          />
        ))}

        <button
          onClick={handleClearOtp}
          type="button"
          className="w-8 cursor-pointer h-8 border border-gray-200 items-center text-[#f74565] ml-1 font-bold rounded-md"
        >
          <IoClose size={24} className="inline" />
        </button>
      </div>

      {isExpired ? (
        <p className="text-center text-sm text-indigo-500 cursor-pointer">
          OTP expired. Please{" "}
          <a className="underline" href="" onClick={handleResendOtp}>
            resend OTP
          </a>
          .
        </p>
      ) : (
        <p className="text-center text-sm text-gray-700">
          OTP expires in {displayTime}
        </p>
      )}

      <button
        type="submit"
        onClick={handleVerifyOtp}
        className="w-full cursor-pointer text-white bg-black py-2 rounded-md text-lg hover:bg-gray-800 transition "
      >
        Continue
      </button>
      <p>
        By entering your email id, you're agreeing to our{" "}
        <a href="" className="text-[#f74565]">
          Terms of Service
        </a>
        and
        <a href="" className="text-[#f74565]">
          Privacy Policy.
        </a>
        . Thanks!
      </p>
    </div>
  );
};

export default StepOTP;
