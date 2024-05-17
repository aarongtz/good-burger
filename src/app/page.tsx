import { Metadata } from "next";

import { redirect } from "next/navigation";

import { getCustomServerSession } from "@/util";
import { APP_NAME } from "@/constants/MetaData";


export const metadata: Metadata = {
    title: `${APP_NAME}`,
    description: "The best ordering burgers site",
};

export default async function Home() {
    const session = await getCustomServerSession();
    if(session) {
        redirect('/burgers');
    } else {
        redirect('/sign-in');
    }
}
