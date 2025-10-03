import React from "react";


interface ErrorDisplayProps {
    message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
    return <p className="text-red-600 mb-4">{message}</p>
}


export default ErrorDisplay;