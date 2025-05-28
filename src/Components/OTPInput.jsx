import React, { useEffect, useRef } from "react";

const OTPInput = ({ code, setCode, length = 6 }) => {
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; 
    const updatedCode = code.split("");
    updatedCode[index] = value;
    const newCode = updatedCode.join("");
    setCode(newCode);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted.length === length) {
      setCode(pasted);
      inputsRef.current[length - 1]?.focus();
    }
  };

  useEffect(() => {
    if (code.length < length) {
      setCode(code.padEnd(length, ""));
    }
  }, [code]);

  return (
   <div
      className="flex flex-wrap sm:flex-nowrap gap-2 items-center justify-center sm:justify-start"
      onPaste={handlePaste}
    >
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          maxLength={1}
          inputMode="numeric"
          className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={code[i] || ""}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}

      {code.length === length && !code.includes("") && (
        <img
          src="/images/checkmark.png"
          alt="Verified"
          className="h-5 w-5 sm:h-6 sm:w-6 mt-2 sm:mt-3 ml-2"
        />
      )}
    </div>
  );
};

export default OTPInput;
