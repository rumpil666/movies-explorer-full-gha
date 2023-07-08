import { useState, useCallback } from "react";
import isEmail from "validator/es/lib/isEmail";

const useFormValidation = () => {
  const [enteredValues, setEnteredValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      !isEmail(value)
        ? e.target.setCustomValidity("Некорректый адрес почты.")
        : e.target.setCustomValidity("");
    }

    setEnteredValues({
      ...enteredValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: e.target.validationMessage,
    });

    setIsFormValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setEnteredValues, setErrors, setIsFormValid]
  );

  return {
    enteredValues,
    errors,
    handleChange,
    isFormValid,
    resetForm,
  };
};

export default useFormValidation;
