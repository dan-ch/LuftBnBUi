import React from 'react';
import Drawer from "@mui/material/Drawer";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface DrawerComponentProps {
    buttonLabel?: string;
    drawerContent: JSX.Element;
    drawerIcon?: React.ReactElement<SvgIconProps>;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerComponent: React.FC<DrawerComponentProps> = ({drawerIcon, buttonLabel, drawerContent, visible, setVisible}) => {
    const toggle = () => {
        setVisible(!visible);
    };
    return (
        <div>
            {buttonLabel && <button onClick={toggle}>
                {buttonLabel}
            </button>}
            {drawerIcon && <div onClick={toggle}>{drawerIcon}</div>}
            <Drawer open={visible} onClose={toggle} anchor="top">
                {drawerContent}
            </Drawer>
        </div>
    );
};