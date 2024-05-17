'use client';

import { useAppSelector } from '@/store';
import styles from './MainHeader.module.css';
import { ModeTypes } from '@/typings/Navigation';

interface MainHeaderProps {
    subTitle?: string;
}

export const MainHeader = ({ subTitle }: MainHeaderProps) => {
    const { modeType } = useAppSelector(state => state.visualModeReducer);
    return (
        <>
            <h1 className={`${modeType === ModeTypes.dark && styles.headerNeon} text-amber-400 dark:text-white text-7xl text-center mb-16 dark:italic font-bold dark:font-bold `}>Good Burger</h1>
            {
                subTitle && (
                    <h4 className={`${modeType === ModeTypes.dark && styles.headerNeon} text-amber-400 dark:text-white text-4xl text-center mb-4 italic font-serif`}>{subTitle}</h4>
                )
            }

        </>

    )
}
