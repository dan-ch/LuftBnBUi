import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { PropertyType } from 'models/Offer';

interface Item {
    value: string;
    label: string;
}

interface CustomSelectProps {
    value: PropertyType | string;
    setValue: React.Dispatch<React.SetStateAction<PropertyType | string>>;
    variant?: "filled" | "outlined" | "standard";
    label?: string;
    menuItems: Item[];
    placeholder?: string;
    name: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ name, value, setValue, variant, label, menuItems, placeholder}) => {

  const {
    register
  } = useFormContext();
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };
    return (
        <FormControl>
            <InputLabel id="simple-select-label">{label}</InputLabel>
            <Select
                {...register(name)}
                id="simple-select"
                labelId="simple-select-label"
                value={value ? value : ""}
                onChange={handleChange}
                variant={variant}
                label={label}
                placeholder={placeholder}
            >

                {menuItems.map((menuItem, index) => (<MenuItem key={index} value={menuItem.value}>{menuItem.label}</MenuItem>))}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;