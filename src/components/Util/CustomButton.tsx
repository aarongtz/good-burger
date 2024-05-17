'use client';

import { AiOutlineLoading } from "react-icons/ai";

interface CustomButtonProps {
    clickHandler?: Function;
    className?: string;
    icon?: JSX.Element;
    text: string;
    loading?: boolean;
    loadingText?: string;
}

export const CustomButton = ({clickHandler, className, text, loadingText, icon, loading = false}: CustomButtonProps) => {
    const handleOnClick = () => {
        if(clickHandler) {
            clickHandler();
        }
    }

    const renderButtonText = () => {
        if(loading) {
            return (
                <>
                    <AiOutlineLoading size={20} className="inline animate-spin" /> {loadingText}
                </>
                
            );
        }

        return (
            <>
                {icon} {text}
            </>
        );
    }

    return (
        <>
            <button disabled={loading} type="button" onClick={handleOnClick} className={className}>{renderButtonText()}</button>
        </>
    )
}