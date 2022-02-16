import React, { Dispatch, SetStateAction, useState, FC, SyntheticEvent, ChangeEvent } from 'react';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "@mui/material/Slider";
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Ifilters } from "models/Offer";



interface MoreFiltersProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    setFilters: Dispatch<SetStateAction<Ifilters>>
    visible: boolean;
    filters: Ifilters;
    prices: number[]
}

function valuetext(value: number) {
    return `${value} $`;
}

const minDistance = 10;


export const MoreFilters: FC<MoreFiltersProps> = ({setVisible, visible, filters, setFilters, prices}) => {
    const [price, setPrice] = useState<number[]>(filters.price);

    const propertyTypes = [
        {
            label: "Dom",
            property: "home",
            checked: filters.home
        },
        {
            label: "Apartament",
            property: "apartment",
            checked: filters.apartment
        },
        {
            label: "Hotel",
            property: "hotel",
            checked: filters.hotel
        },
        {
            label: "Hostel",
            property: "hostel",
            checked: filters.hostel
        },
    ];
    const handleChange1 = (
        event: Event | SyntheticEvent,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        activeThumb === 0 ? setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]) : setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    };

    const updateFiltersPrice = () => {
        setFilters({
            ...filters,
            price: price
        })
    }

    const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            [event.target.name] : event.target.checked
        })
        console.log({
            ...filters,
            [event.target.name] : event.target.checked
        })
    }


    return (<div className="more-filters">
            <div className="more-filters__header">
                <IconButton onClick={() => setVisible(!visible)}>
                    <CloseIcon />
                </IconButton>
                <h2>Więcej filtrów</h2>
                <div></div>
            </div>
        <div className="more-filters__container">

            <div className="more-filters__price">
                <h2>
                    Cena za noc

                </h2>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={price}
                    onChange={handleChange1}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    onChangeCommitted={updateFiltersPrice}
                    disableSwap
                    min={prices[0]}
                    max={prices[1]}

                />
                <div className="more-filters__price__inputs">
                    <TextField
                        label="Cena minimalna"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '15ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">zł</InputAdornment>,
                        }}
                        value={price[0]}
                    />
                    <h2>-</h2>
                    <TextField
                        label="Cena maksymalna"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '15ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">zł</InputAdornment>,
                        }}
                        value={price[1]
                    }
                    />
                </div>
            </div>
            <div className="more-filters__property-type">
                <h2>
                    Rodzaj nieruchomości
                </h2>
                <div>
                    {propertyTypes.map(item => (
                      <FormControlLabel key={item.property} control={<Checkbox checked={item.checked} name={item.property} onChange={handleChangeCheckbox}/>} label={item.label} />
                    ))}
                </div>
            </div>

            <div className="more-filters__facilities">
                <h2>
                    Palenie
                </h2>
                <FormControlLabel control={<Switch checked={filters.smoking} name="smoking" onChange={handleChangeCheckbox}/>} label={<SmokingRoomsIcon />} />
            </div>
        </div>

    </div>);
};