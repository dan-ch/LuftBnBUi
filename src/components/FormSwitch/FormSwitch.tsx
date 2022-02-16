import React from 'react';
import { FormControlLabel, Switch } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface FormSwitchProps {
  name: string;
  checked?: boolean;
  label: string | JSX.Element;
}

export const FormSwitch: React.FC<FormSwitchProps> = ({name, checked, label}) => {
  const { register } = useFormContext();
  return (
    <FormControlLabel control={<Switch defaultChecked={checked} {...register(name)}/>} label={label}/>
  );
};