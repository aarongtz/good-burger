import { Metadata } from "next";

import { BurgerGrid } from "@/components/Burgers";
import { MainHeader } from "@/components/Home";

import { APP_NAME } from "@/constants/MetaData";

import withAuth from "@/hoc/withAuth";

export const metadata: Metadata = {
    title: `${APP_NAME} - Burger List`,
    description: "Burger App burger list",
};


const BurgersGrid = () => {
    
    return (
        <>
            <MainHeader />
            <BurgerGrid/>
        </>
        
    )
}

export default withAuth(BurgersGrid);
