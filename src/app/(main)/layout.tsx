'use client';

import { Navbar } from "@/components/Navigation";
import { useAppSelector } from "@/store";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { modeType } = useAppSelector(state => state.visualModeReducer);
    return (
        <div className={`${modeType}`}>
            <div className="bg-white dark:bg-black">
                { /* Navbar here: */}
                <Navbar />

                { /* Container: */}
                <div className="m-20">{children}</div>
            </div>

            
        </div>
    );
}