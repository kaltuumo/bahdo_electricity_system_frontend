import { useState } from "react";
import Label from "./Label";

const Input = ({ label, type = "text", error, className = "", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Go'aami nooca input-ka
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <Label>{label}</Label>}

      <div className="relative">
        <input
          {...props}
          type={inputType}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}`}
        />

        {/* Password show/hide toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
