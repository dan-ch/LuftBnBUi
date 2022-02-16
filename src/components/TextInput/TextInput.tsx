import TextField from "@mui/material/TextField";
import React, { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  variant: "standard" | "filled" | "outlined";
  multiline?: boolean;
  numberProps?: { min: string, max: string, step: string }
  value?: string | number;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  placeholder,
  type,
  variant,
  multiline,
  numberProps,
  value,
}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();
  return (
    <TextField
      {...register(name)}
      label={label}
      name={name}
      placeholder={placeholder}
      fullWidth
      type={type}
      color="primary"
      variant={variant}
      error={!!errors[name]}
      multiline={multiline}
      inputProps={numberProps}
      helperText={errors[name] ? errors[name]?.message : ""}
      defaultValue={value}
    />
  );
};

export default TextInput;
