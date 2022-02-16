import React from 'react';
import { CircularProgress } from "@mui/material";

interface LoadingIndicatorProps {
  size?: string | number | undefined;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({size}) => {
  return (<div className="loading-indicator">
    <CircularProgress size={size}/>
  </div>);
};

export default LoadingIndicator;