'use client';

import { useEffect, useState } from "react";

import { AlertTypes } from "@/typings";

interface AlertProps {
    className?: string;
    type: AlertTypes;
    header: string;
    message: string;
    onClosedAlert: Function;
}

export const Alert = ({ type, header, message, onClosedAlert, className = '' }: AlertProps) => {
    const [isShowing, setIsShowing] = useState(true);

    useEffect(() => {
        const timeId = setTimeout(() => {
                // After 5 seconds set the show value to false
                setIsShowing(false);
                if(onClosedAlert) {
                    onClosedAlert();
                }
            }, 4000);
        
        return () => {
            clearTimeout(timeId);
        }
    }, [isShowing, onClosedAlert]);

    let backgroundColorClass = '';
    switch (type) {
        case 'success':
            backgroundColorClass = 'bg-green-700';
            break;
        case 'warning':
            backgroundColorClass = 'bg-yellow-500';
            break;
        case 'error':
            backgroundColorClass = 'bg-red-600';
    }


    return (
        <div className={`${backgroundColorClass} ${className} ${isShowing ? 'block' : 'hidden'} transition ease-in-out delay-150 p-6 mb-4`}>
            <h5 className="mb-4 text-white">
                {header}
            </h5>
            <p className="text-white">
                {message}
            </p>
        </div>
    )
}