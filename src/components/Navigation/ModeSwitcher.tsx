'use client';

import { useAppDispatch, useAppSelector } from "@/store";
import { toggleType } from "@/store/nav/visualModeSlice";
import { ModeTypes } from "@/typings/Navigation";
import { CiSun } from "react-icons/ci"
import { FaRegMoon } from "react-icons/fa6";

export const ModeSwitcher = () => {
    const { modeType } = useAppSelector(state => state.visualModeReducer);
    const dispatch = useAppDispatch();

    const handleModeToggle = () => {
        dispatch(toggleType());
    };

    return (
        <>
            <button onClick={handleModeToggle} title="Toggle mode" type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Toggle mode</span>
                {
                    modeType === ModeTypes.dark ? (
                        <CiSun size={30} className="inline" />
                    ) : (
                        <FaRegMoon size={25} className="inline" />
                    )
                }
                
            </button>
        </>
    )
}
