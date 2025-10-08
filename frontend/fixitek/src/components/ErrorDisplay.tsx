import React from "react";


interface ErrorDisplayProps {
    message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
    return <p className="mx-4 text-red-600">{message}</p>
}


export default ErrorDisplay;