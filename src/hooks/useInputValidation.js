import { useState } from "react";

const useInputValidation = (validationOptions) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const validate = (input, options) => {
    const { maxLength, regex } = options;
    if (!input) {
      return { message: "", valid: false };
    }
    if (maxLength && input.length > maxLength) {
      return {
        message: `Please enter no more than ${maxLength} characters`,
        valid: false,
      };
    }
    if (regex) {
      const valid = input.match(regex);
      if (!valid)
        return {
          message: "Please enter without special characters",
          valid: false,
        };
    }
    return { message: "", valid: true };
  };

  const { message, valid } = validate(inputValue, validationOptions);

  return {
    inputValue,
    inputValueValid: valid,
    inputHelperText: message,
    handleInputChange,
    handleClearInput,
  };
};

export default useInputValidation;
